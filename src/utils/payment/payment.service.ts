import { config } from '@config';
import { Exception } from '@middlewares/error.middleware';
import { TransactionStatus } from '@models/transaction.model';
import TransactionService from '@services/transaction.service';
import UserService from '@services/user.service';
import { addMonths } from 'date-fns';
import fetch from 'node-fetch';
import { Service } from 'typedi';
const { host, secretKey } = config.payment;

@Service()
class PaymentService {
  constructor(
    private readonly user: UserService,
    private readonly transaction: TransactionService,
  ) {}

  private headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${secretKey}`,
  };

  async createCharge(data: any): Promise<string> {
    let params = JSON.stringify({
      email: data.email,
      amount: (data.amount * 100).toFixed(),
      currency: 'NGN',
      channels: ['card', 'bank', 'ussd', 'qr', 'bank_transfer'],
      reference: data.reference,
      metadata: {
        rideId: data.rideId,
        riderId: data.riderId,
        userId: data.userId,
      },
    });
    let response = await fetch(`${host}/transaction/initialize`, {
      method: 'POST',
      headers: this.headers,
      body: params,
    });
    let charge = await response.json();
    if (!charge.status) {
      throw new Exception(400, charge.message);
    }
    return charge.data.authorization_url;
  }

  async verifyCharge(reference: string): Promise<string> {
    let response = await fetch(`${host}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: this.headers,
    });
    let charge = await response.json();
    return charge.data;
  }

  async createSubcriptionURI(data: any): Promise<string | undefined> {
    try {
      let params = JSON.stringify({
        email: data.email,
        amount: (data.amount * 100).toFixed(),
        currency: 'NGN',
        channels: [data.paymentChannel],
        reference: data.reference,
        metadata: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          subscriptionType: data.subscriptionType,
          subscriberId: data.subscriberId,
        },
      });
      let response = await fetch(`${host}/transaction/initialize`, {
        method: 'post',
        headers: this.headers,
        body: params,
      });
      let url = await response.json();
      return url.data.authorization_url;
    } catch (e) {
      console.log(e);
    }
  }

  async createSubcriptionCharge(data: any): Promise<any> {
    try {
      let params = JSON.stringify({
        email: data.email,
        amount: (data.amount * 100).toFixed(),
        reference: data.reference,
        authorization_code: data.paymentAuthId,
        metadata: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          subscriptionType: data.subscriptionType,
          subscriberId: data.subscriberId,
        },
      });
      let response = await fetch(`${host}/transaction/charge_authorization`, {
        method: 'post',
        headers: this.headers,
        body: params,
      });
      let charge = await response.json();
      return charge;
    } catch (e) {
      console.log(e);
    }
  }

  async queryTransaction(transactionId: string): Promise<{
    trxReference: string;
    trxId: string;
    amount: number;
    status: string;
  }> {
    let response = await fetch(`${host}/transaction/${transactionId}`, {
      method: 'get',
      headers: this.headers,
    });
    let transaction = await response.json();
    return {
      trxReference: transaction.data.reference,
      trxId: transaction.data.id,
      amount: transaction.data.amount,
      status: transaction.data.status,
    };
  }

  async createTransferRecipient(data: {
    name: string;
    accountNumber: string;
    bankCode: string;
    currencySlug: string;
  }): Promise<{ status: boolean; transferRecipientCode: string }> {
    let params = JSON.stringify({
      type: 'nuban',
      name: data.name,
      account_number: data.accountNumber,
      bank_code: data.bankCode,
      currency: data.currencySlug,
    });
    let response = await fetch(`${host}/transferrecipient`, {
      method: 'POST',
      headers: this.headers,
      body: params,
    });
    let recipient = await response.json();
    return {
      status: recipient.status,
      transferRecipientCode: recipient.data.recipient_code,
    };
  }

  public async webhook(data: any) {
    const { reference, id, metadata } = data.data;
    const user = await this.user.findOne(metadata.userId);
    if (!user) throw new Exception(404, 'user not found');
    let transaction = await this.transaction.findbyId(reference);
    if (!transaction) throw new Exception(404, 'transaction not found');

    if (transaction.status === TransactionStatus.success) {
      throw new Exception(409, 'transaction already confirmed');
    }

    let tx = await this.queryTransaction(id);

    if (tx.status == 'failed') {
      return false;
    }

    await this.transaction.updateTransaction(transaction.reference, {
      status: TransactionStatus.success,
    });

    return true;
  }
}

export default PaymentService;
