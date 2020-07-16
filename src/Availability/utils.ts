import moment from "moment-timezone";

export function findSameDay(
  sourceId: string,
  sourceStart: any,
  sourceEnd: any,
  list: any,
  tz: any
) {
  const sourceDateFormat = sourceStart.format("DD/MM/YY");

  let start = sourceStart;
  let end = sourceEnd;
  const combined = list.filter((item: any) => {
    const listStart = moment.tz(item.start, tz);
    const listEnd = moment.tz(item.end, tz);
    if (
      listStart.format("DD/MM/YY") === sourceDateFormat &&
      sourceId !== item.id
    ) {
      if (start <= listEnd && end >= listStart) {
        start = start > listStart ? listStart : start;
        end = listEnd > end ? listEnd : end;
        return item;
      }
    }
  });

  return {
    start,
    end,
    combined,
  };
}
