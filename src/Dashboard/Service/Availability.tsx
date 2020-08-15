import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment-timezone";
import DatePicker from "react-datepicker";
import update from "immutability-helper";
import Switch from "../../common/Switch";
import SelectCommon from "../../common/Select";
import {
  updateUserAvailability,
  getCurrentUserAvailability,
} from "../../../graphql/User/UserAPI";
import {
  updateAvailability,
  deleteAvailability,
  createAvailability,
} from "../../../graphql/Availability/AvailabilityAPI";
import { AVAILABILITY_FRAGMENT } from "../../../graphql/Availability/availability";
import { XCircle } from "react-feather";
import { mediaBreakpointDown } from "../../common/utility";
import {
  availabilityFragment,
  getCurrentUserAvailabilityQuery_currentUser_userAvailability,
  AvailabilityDayEnum,
} from "../../../graphql/generated";
import Popper from "../../common/Popper";
import { CommonInput } from "../../common/Input";

export const AvailabilityContainer = styled.div`
  border: 1px solid rgb(229, 227, 221);
  border-radius: 6px;
  margin-bottom: 15px;
`;

export const AvailabilityContent = styled.div`
  padding: 10px 15px;
`;

export const AddAvailability = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  text-align: center;
  user-select: none;
  border-top: 1px solid rgb(229, 227, 221);
`;

export const AvailabilityHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AvailabilityTitle = styled.div`
  font-weight: bold;
`;

export const AvailabilityTimes = styled.div`
  margin-top: 15px;
`;
export const AvailabilityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  flex-wrap: wrap;
  margin-bottom: 7px;
  text-align: center;

  svg {
    margin-left: 15px;
    cursor: pointer;
  }

  > div {
    :last-child {
      display: flex;
      align-items: center;

      > div {
        ${mediaBreakpointDown("xs")} {
          flex: 1;

          select {
            width: 100% !important;
          }
        }
      }
    }
    ${mediaBreakpointDown("xs")} {
      flex-basis: 100%;
      margin-bottom: 7px;

      select {
        width: 100% !important;
      }
    }
  }
`;

const Select = styled(SelectCommon)`
  width: 100px;
`;

export default () => {
  const [data, setData] = useState<any>([]);
  const { data: userData } = getCurrentUserAvailability();

  const currentUser = userData?.currentUser;

  useEffect(() => {
    const nodes = (currentUser?.userAvailability.availabilitiesConnection
      .nodes || []) as availabilityFragment[];

    const monday: availabilityFragment[] = [];
    const tuesday: availabilityFragment[] = [];
    const wednesday: availabilityFragment[] = [];
    const thursday: availabilityFragment[] = [];
    const friday: availabilityFragment[] = [];
    const saturday: availabilityFragment[] = [];
    const sunday: availabilityFragment[] = [];
    const unavailable: availabilityFragment[] = [];

    nodes.forEach((node) => {
      switch (node.day) {
        case AvailabilityDayEnum.MONDAY:
          return monday.push(node);
        case AvailabilityDayEnum.TUESDAY:
          return tuesday.push(node);
        case AvailabilityDayEnum.WEDNESDAY:
          return wednesday.push(node);
        case AvailabilityDayEnum.THURSDAY:
          return thursday.push(node);
        case AvailabilityDayEnum.FRIDAY:
          return friday.push(node);
        case AvailabilityDayEnum.SATURDAY:
          return saturday.push(node);
        case AvailabilityDayEnum.SUNDAY:
          return sunday.push(node);
        default:
          return unavailable.push(node);
      }
    });

    setData([
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      unavailable,
    ]);
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[0]}
        title="Monday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.MONDAY}
      />
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[1]}
        title="Tuesday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.TUESDAY}
      />
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[2]}
        title="Wednesday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.WEDNESDAY}
      />
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[3]}
        title="Thursday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.THURSDAY}
      />
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[4]}
        title="Friday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.FRIDAY}
      />
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[5]}
        title="Saturday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.SATURDAY}
      />
      <AvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[6]}
        title="Sunday"
        userAvailability={currentUser.userAvailability}
        day={AvailabilityDayEnum.SUNDAY}
      />
      <UnAvailabilitySection
        timezone={currentUser.timezone}
        availabilities={data[7]}
        userAvailability={currentUser.userAvailability}
      />
    </div>
  );
};

interface AvailabilitySectionProps {
  title: string;
  availabilities: availabilityFragment[];
  timezone: string;
  day: AvailabilityDayEnum;
  userAvailability: getCurrentUserAvailabilityQuery_currentUser_userAvailability;
}

const AvailabilitySection = ({
  title,
  availabilities: initAvailabilities = [],
  timezone,
  userAvailability,
  day,
}: AvailabilitySectionProps) => {
  const getActive = () => {
    switch (day) {
      case AvailabilityDayEnum.MONDAY:
        return userAvailability.mondayActive;
      case AvailabilityDayEnum.TUESDAY:
        return userAvailability.tuesdayActive;
      case AvailabilityDayEnum.WEDNESDAY:
        return userAvailability.wednesdayActive;
      case AvailabilityDayEnum.THURSDAY:
        return userAvailability.thursdayActive;
      case AvailabilityDayEnum.FRIDAY:
        return userAvailability.fridayActive;
      case AvailabilityDayEnum.SATURDAY:
        return userAvailability.saturdayActive;
      case AvailabilityDayEnum.SUNDAY:
        return userAvailability.sundayActive;
      default:
        true;
    }
  };
  const active = getActive();

  const [availabilities, setAvailabilities] = useState<availabilityFragment[]>(
    []
  );
  const [onUdateUserAvailability] = updateUserAvailability();
  const [onUpdateAvailability] = updateAvailability();

  const [onCreateAvailability] = createAvailability({
    update: (cache, { data }) => {
      if (data?.createAvailability?.availability?.id) {
        cache.modify({
          id: cache.identify(userAvailability as any),
          fields: {
            availabilitiesConnection(existingConnection) {
              const newAvail = cache.writeFragment({
                data: data.createAvailability?.availability,
                fragment: AVAILABILITY_FRAGMENT,
              });

              return {
                ...existingConnection,
                nodes: [...existingConnection.nodes, newAvail],
              };
            },
          },
        });
      }
    },
  });

  const [onDeleteAvailability] = deleteAvailability({
    update: (cache, { data }) => {
      if (data?.deleteAvailability?.availability?.id) {
        cache.modify({
          id: cache.identify(userAvailability as any),
          fields: {
            availabilitiesConnection(existingConnection, { readField }) {
              return {
                ...existingConnection,
                nodes: existingConnection.nodes.filter(
                  (node: any) =>
                    readField("id", node) !==
                    data?.deleteAvailability?.availability?.id
                ),
              };
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    setAvailabilities(
      initAvailabilities.map((entry) => ({
        ...entry,
        starting: moment.tz(entry.starting, timezone).format("HH:mm"),
        ending: moment.tz(entry.ending, timezone).format("HH:mm"),
      }))
    );
  }, [initAvailabilities]);

  const onUpdateAvailabilities = (field: string, value: any, idx: number) => {
    const newAvailabilties = update(availabilities, {
      [idx]: {
        [field]: {
          $set: value,
        },
      },
    });
    setAvailabilities(newAvailabilties);
    onUpdateAvailability({
      variables: {
        input: {
          availabilityId: newAvailabilties[idx].id,
          starting: moment
            .tz(timezone)
            .set("hour", parseInt(newAvailabilties[idx].starting.split(":")[0]))
            .set(
              "minute",
              parseInt(newAvailabilties[idx].starting.split(":")[1])
            )
            .toISOString(),
          ending: moment
            .tz(timezone)
            .set("hour", parseInt(newAvailabilties[idx].ending.split(":")[0]))
            .set("minute", parseInt(newAvailabilties[idx].ending.split(":")[1]))
            .toISOString(),
        },
      },
    });
  };

  return (
    <AvailabilityContainer>
      <AvailabilityContent>
        <AvailabilityHeaderContainer>
          <AvailabilityTitle>{title}</AvailabilityTitle>
          <div>
            <Switch
              onChange={() =>
                onUdateUserAvailability({
                  variables: {
                    input: {
                      userAvailabilityId: userAvailability.id,
                      [title.toLowerCase() + "Active"]: !active,
                    },
                  },
                })
              }
              checked={active}
            />
          </div>
        </AvailabilityHeaderContainer>
        {active && (
          <AvailabilityTimes>
            {availabilities.map((date, idx) => (
              <AvailabilityItem key={date.id}>
                <div>
                  <Select
                    onChange={(e) =>
                      onUpdateAvailabilities("starting", e.target.value, idx)
                    }
                    value={date.starting}
                  >
                    <option value="00:00">12:00 AM</option>
                    <option value="00:30">12:30 AM</option>
                    <option value="01:00">01:00 AM</option>
                    <option value="01:30">01:30 AM</option>
                    <option value="02:00">02:00 AM</option>
                    <option value="02:30">02:30 AM</option>
                    <option value="03:00">03:00 AM</option>
                    <option value="03:30">03:30 AM</option>
                    <option value="04:00">04:00 AM</option>
                    <option value="04:30">04:30 AM</option>
                    <option value="05:00">05:00 AM</option>
                    <option value="05:30">05:30 AM</option>
                    <option value="06:00">06:00 AM</option>
                    <option value="06:30">06:30 AM</option>
                    <option value="07:00">07:00 AM</option>
                    <option value="07:30">07:30 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="08:30">08:30 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="18:30">06:30 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="19:30">07:30 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="20:30">08:30 PM</option>
                    <option value="21:00">09:00 PM</option>
                    <option value="21:30">09:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="22:30">10:30 PM</option>
                    <option value="23:00">11:00 PM</option>
                    <option value="23:30">11:30 PM</option>
                  </Select>
                </div>
                <div>to</div>
                <div>
                  <Select
                    onChange={(e) =>
                      onUpdateAvailabilities("ending", e.target.value, idx)
                    }
                    value={date.ending}
                  >
                    <option value="00:00">12:00 AM</option>
                    <option value="00:30">12:30 AM</option>
                    <option value="01:00">01:00 AM</option>
                    <option value="01:30">01:30 AM</option>
                    <option value="02:00">02:00 AM</option>
                    <option value="02:30">02:30 AM</option>
                    <option value="03:00">03:00 AM</option>
                    <option value="03:30">03:30 AM</option>
                    <option value="04:00">04:00 AM</option>
                    <option value="04:30">04:30 AM</option>
                    <option value="05:00">05:00 AM</option>
                    <option value="05:30">05:30 AM</option>
                    <option value="06:00">06:00 AM</option>
                    <option value="06:30">06:30 AM</option>
                    <option value="07:00">07:00 AM</option>
                    <option value="07:30">07:30 AM</option>
                    <option value="08:00">08:00 AM</option>
                    <option value="08:30">08:30 AM</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="16:00">04:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="18:00">06:00 PM</option>
                    <option value="18:30">06:30 PM</option>
                    <option value="19:00">07:00 PM</option>
                    <option value="19:30">07:30 PM</option>
                    <option value="20:00">08:00 PM</option>
                    <option value="20:30">08:30 PM</option>
                    <option value="21:00">09:00 PM</option>
                    <option value="21:30">09:30 PM</option>
                    <option value="22:00">10:00 PM</option>
                    <option value="22:30">10:30 PM</option>
                    <option value="23:00">11:00 PM</option>
                    <option value="23:30">11:30 PM</option>
                  </Select>
                  <XCircle
                    size={20}
                    onClick={() =>
                      onDeleteAvailability({
                        variables: {
                          input: {
                            availabilityId: date.id,
                          },
                        },
                      })
                    }
                  />
                </div>
              </AvailabilityItem>
            ))}
          </AvailabilityTimes>
        )}
      </AvailabilityContent>
      {active && (
        <AddAvailability
          onClick={() =>
            onCreateAvailability({
              variables: {
                input: {
                  userAvailabilityId: userAvailability.id,
                  day,
                },
              },
            })
          }
        >
          Add hours +
        </AddAvailability>
      )}
    </AvailabilityContainer>
  );
};

interface UnAvailabilitySectionProps {
  availabilities: availabilityFragment[];
  timezone: string;
  userAvailability: getCurrentUserAvailabilityQuery_currentUser_userAvailability;
}

const UnAvailabilitySection = ({
  userAvailability,
  timezone,
  availabilities = [],
}: UnAvailabilitySectionProps) => {
  const currDate = moment();
  const [openAddDate, setOpenAddDate] = useState(false);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      setOpenAddDate(false);
      setStartDate(null);
      setEndDate(null);
      onCreateAvailability({
        variables: {
          input: {
            userAvailabilityId: userAvailability.id,
            starting: moment.tz(start, timezone).toISOString(),
            ending: moment.tz(end, timezone).toISOString(),
            day: AvailabilityDayEnum.UNAVAILABLE,
          },
        },
      });
    }
  };

  const [onUdateUserAvailability] = updateUserAvailability();

  const [onCreateAvailability] = createAvailability({
    update: (cache, { data }) => {
      if (data?.createAvailability?.availability?.id) {
        cache.modify({
          id: cache.identify(userAvailability as any),
          fields: {
            availabilitiesConnection(existingConnection) {
              return {
                ...existingConnection,
                nodes: [
                  ...existingConnection.nodes,
                  data.createAvailability?.availability,
                ],
              };
            },
          },
        });
      }
    },
  });

  const [onDeleteAvailability] = deleteAvailability({
    update: (cache, { data }) => {
      if (data?.deleteAvailability?.availability?.id) {
        cache.modify({
          id: cache.identify(userAvailability as any),
          fields: {
            availabilitiesConnection(existingConnection, { readField }) {
              return {
                ...existingConnection,
                nodes: existingConnection.nodes.filter(
                  (node: any) =>
                    readField("id", node) !==
                    data?.deleteAvailability?.availability?.id
                ),
              };
            },
          },
        });
      }
    },
  });

  return (
    <AvailabilityContainer>
      <AvailabilityContent>
        <AvailabilityHeaderContainer>
          <AvailabilityTitle>Unavailable days</AvailabilityTitle>
          <div>
            <Switch
              onChange={() =>
                onUdateUserAvailability({
                  variables: {
                    input: {
                      userAvailabilityId: userAvailability.id,
                      unavailableActive: !userAvailability.unavailableActive,
                    },
                  },
                })
              }
              checked={userAvailability.unavailableActive}
            />
          </div>
        </AvailabilityHeaderContainer>
        {userAvailability.unavailableActive && (
          <AvailabilityTimes>
            {availabilities.map((date) => (
              <AvailabilityItem key={date.id}>
                <InputItem date={date} currDate={currDate} timezone={timezone} />
                <XCircle
                  size={20}
                  onClick={() =>
                    onDeleteAvailability({
                      variables: {
                        input: {
                          availabilityId: date.id,
                        },
                      },
                    })
                  }
                />
              </AvailabilityItem>
            ))}
          </AvailabilityTimes>
        )}
      </AvailabilityContent>
      {userAvailability.unavailableActive && (
        <Popper
          isOpen={openAddDate}
          onClickOutside={() => setOpenAddDate(false)}
          content={
            <div>
              <DatePicker
                showPopperArrow={false}
                minDate={currDate.toDate()}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selected={startDate}
                selectsRange
                inline
                disabledKeyboardNavigation
              />
            </div>
          }
        >
          <AddAvailability onClick={() => setOpenAddDate(true)}>
            Add dates +
          </AddAvailability>
        </Popper>
      )}
    </AvailabilityContainer>
  );
};

const Input = styled(CommonInput)``;

const InputItem = ({ date, currDate, timezone }: any) => {
  const [openAddDate, setOpenAddDate] = useState(false);
  const [startDate, setStartDate] = useState<any>(moment.tz(date.starting, timezone).toDate());
  const [endDate, setEndDate] = useState<any>(moment.tz(date.ending, timezone).toDate());
  const [onUpdateAvailability] = updateAvailability();

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      setOpenAddDate(false);
      onUpdateAvailability({
        variables: {
          input: {
            availabilityId: date.id,
            starting: moment.tz(start, timezone).toISOString(),
            ending: moment.tz(end, timezone).toISOString(),
          },
        },
      });
    }
  };
  return (
    <div style={{ flex: 1 }}>
      <Popper
        isOpen={openAddDate}
        onClickOutside={() => setOpenAddDate(false)}
        content={
          <div>
            <DatePicker
              showPopperArrow={false}
              minDate={currDate.toDate()}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selected={startDate}
              selectsRange
              inline
              disabledKeyboardNavigation
            />
          </div>
        }
      >
        <Input
          onClick={() => {
            setOpenAddDate(true);
            setStartDate(moment.tz(date.starting, timezone).toDate());
            setEndDate(moment.tz(date.ending, timezone).toDate());
          }}
          style={{ textAlign: "center" }}
          value={`${moment
            .tz(date.starting, timezone)
            .format("MM/DD/YYYY")} ~ ${moment
            .tz(date.ending, timezone)
            .format("MM/DD/YYYY")}`}
          readOnly
        />
      </Popper>
    </div>
  );
};
