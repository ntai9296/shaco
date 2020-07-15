import moment from 'moment-timezone';

function minutesOfDay(m: any) {
  return m.minutes() + m.hours() * 60;
}

export function findSameDay(sourceStart: any, sourceEnd: any, list: any) {
  const result = list.filter((item: any) => {
    let startDate = moment(item.start);
    let endDate = moment(item.end);
    let sourceStartDate = moment(sourceStart);
    let sourceEndDate = moment(sourceEnd);

    if (
      startDate.format('DD/MM/YYYY') === sourceStartDate.format('DD/MM/YYYY')
    ) {
      const startTime = startDate.format('HHmm');
      const endTime = endDate.format('HHmm');
      const sourceStartTime = sourceStartDate.format('HHmm');
      const sourceEndTime = sourceEndDate.format('HHmm');

      if (startTime === sourceStartTime) {
        return item;
      }
      if (startTime === sourceEndTime && sourceStartTime > startTime) {
        return item;
      }
      if (endTime === sourceStartTime && sourceEndTime > endTime) {
        return item;
      }
      if (sourceStartTime > startTime && sourceEndTime < endTime) {
        return item;
      }
      if (startTime > sourceStartTime && endTime < sourceEndTime) {
        return item;
      }
    }
  });

  if (result.length > 0) {
    console.log('Combine');
  }

  console.log(result);
}
