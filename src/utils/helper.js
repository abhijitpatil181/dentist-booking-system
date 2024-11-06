import { format, parse, isDate, fromUnixTime, getWeek, getMonth } from 'date-fns';

export const parseEventDate = eventDate => {
  // Ensure eventDate is a string
  if (typeof eventDate !== 'string') {
    console.error('eventDate is not a valid string:', eventDate);
    return null;
  }

  try {
    const dateObject = parse(eventDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'xx", new Date());
    return format(dateObject, 'yyyy-MM-dd'); // Format as YYYY-MM-DD
  } catch (error) {
    console.error('Error parsing date:', error);
    return null;
  }
};

export const transformData = (data, serviceData, reportType = 'weekly') => {
  const groupedData = data.reduce((acc, item) => {
    const dateObj = fromUnixTime(item.date.seconds);
    const groupKey = reportType === 'weekly' ? getWeek(dateObj) : getMonth(dateObj) + 1;
    const formattedDate = format(dateObj, 'yyyy-MM-dd');

    if (!acc[groupKey]) {
      acc[groupKey] = {
        reportId: crypto.randomUUID(),
        date: formattedDate,
        dentistName: item.dentistId,
        numberOfBooking: 0,
        bookings: [],
      };
    }

    acc[groupKey].numberOfBooking += 1;
    acc[groupKey].bookings.push({
      patientName: item.customerId,
      serviceName: serviceData.find(service => service.serviceId === item.serviceData[0].serviceId)
        ?.serviceName,
      bookingDate: `${format(dateObj, 'd MMMM yyyy')}`,
    });

    return acc;
  }, {});

  return Object.values(groupedData);
};

export const getAdminDashboardData = (data, serviceData) => {
  return data.flatMap(item => {
    const appointmentDate = format(fromUnixTime(item.date.seconds), 'yyyy-MM-dd'); // Updated format
    const patientName = item.customerId;
    const dentistName = item.dentistId;

    return item.serviceData.map(service => ({
      appointmentDate: `${appointmentDate}`,
      patientName: patientName,
      dentistName: dentistName,
      serviceRequested: serviceData.find(services => services.serviceId === service.serviceId)?.serviceName,
    }));
  });
};
