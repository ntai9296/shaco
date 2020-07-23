const ics = require("ics");

const initEvent: any = {
  startInputType: "utc",
  endInputType: "utc",
  status: "CONFIRMED",
  busyStatus: "BUSY",
};

export default (req: any, res: any) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const event = JSON.parse(req.body.event);

  ics.createEvent({ ...initEvent, ...event }, (error: any, value: any) => {
    if (error) {
      return res.end(JSON.stringify({ data: '' }));
    }
    return res.end(JSON.stringify({ data: value }));
  });
};
