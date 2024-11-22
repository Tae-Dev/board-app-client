import moment from 'moment-timezone';

export default function ConvertTime(date: string) {
    const timezone = 'Asia/Bangkok';
    const timeAgo = moment(date).tz(timezone).fromNow();
  
    return timeAgo
}
