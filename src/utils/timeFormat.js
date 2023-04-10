import dayjs from 'dayjs';
import 'dayjs/locale/id';

const currentDate = dayjs();
const time = (createdAt) => {
  const createdDate = dayjs(createdAt);
  if (currentDate.diff(createdDate, 'day') < 1) {
    const formattedTime = createdDate.format('HH:mm');
    return formattedTime;
  } else {
    const formattedDate = createdDate.format('DD MMMM YYYY');
    return formattedDate;
  }
};

export default time;
