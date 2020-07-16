import moment from 'moment-timezone';
import { startOfDay } from '@fullcalendar/core';

function minutesOfDay(m: any) {
  return m.minutes() + m.hours() * 60;
}

export function findSameDay(sourceStart: any, sourceEnd: any, list: any) {
  let sourceStartDate = moment(sourceStart);
  let sourceEndDate = moment(sourceEnd);
  const sourceStartTime = sourceStartDate.format('HHmm');
  const sourceEndTime = sourceEndDate.format('HHmm');

  const result = list.filter((item: any) => {
    let startDate = moment(item.start);
    let endDate = moment(item.end);

    if (
      startDate.format('DD/MM/YYYY') === sourceStartDate.format('DD/MM/YYYY')
    ) {
      const startTime = startDate.format('HHmm');
      const endTime = endDate.format('HHmm');

      if (startTime === sourceStartTime) {
        return item;
      }
      if (startTime === sourceEndTime) {
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
      if (startTime > sourceStartTime && startTime < sourceEndTime) {
        debugger;
        return item;
      }
    }
  });

  let starting = sourceStart;
  let ending = sourceEnd;
  if (result.length > 0) {
    const combineEvent = result[0];
    let startDate = moment(combineEvent.start);
    let endDate = moment(combineEvent.end);
    const startTime = startDate.format('HHmm');
    const endTime = endDate.format('HHmm');

    if (startTime < sourceStartTime) {
      starting = combineEvent.start;
    }
    if (endTime > sourceEndTime) {
      ending = combineEvent.end;
    }
    console.log('Combine');
  }

  console.log(starting);
  console.log(ending);
  console.log(result);
}
