import { differenceInMinutes } from 'date-fns';

const duration = (startTime: Date) => {
  const currentTime = new Date();
  const minutes = differenceInMinutes(currentTime, startTime);
  return minutes;
};

export default duration;
