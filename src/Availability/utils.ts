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
  const deleteIds: string[] = list.reduce((curr: any, item: any) => {
    const listStart = moment.tz(item.start, tz);
    const listEnd = moment.tz(item.end, tz);
    if (
      item.editable &&
      listStart.format("DD/MM/YY") === sourceDateFormat &&
      sourceId !== item.id &&
      start <= listEnd &&
      end >= listStart
    ) {
      start = start > listStart ? listStart : start;
      end = listEnd > end ? listEnd : end;
      return [...curr, item.id];
    }
    return curr;
  }, []);

  return {
    start,
    end,
    deleteIds,
  };
}
