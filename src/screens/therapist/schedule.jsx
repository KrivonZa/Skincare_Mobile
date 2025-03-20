import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import * as Calendar from "expo-calendar";
import { Ionicons } from "@expo/vector-icons";
import { Calendar as RNCalendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

export function Schedule() {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]); // Sự kiện cho ngày được chọn
    const [monthEvents, setMonthEvents] = useState([]); // Sự kiện cho cả tháng
    const [viewMode, setViewMode] = useState("day");
    const [selectedDate, setSelectedDate] = useState(new Date("2025-03-21"));

    const timeSlots = [
        { id: 1, start: "07:30", end: "09:00" },
        { id: 2, start: "09:00", end: "10:30" },
        { id: 3, start: "10:30", end: "12:00" },
        { id: 4, start: "13:00", end: "14:30" },
        { id: 5, start: "14:30", end: "16:00" },
        { id: 6, start: "16:00", end: "17:30" },
    ];

    useEffect(() => {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync();
            if (status !== "granted") {
                console.log("Calendar permission denied");
                return;
            }

            let calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            console.log("Calendars:", calendars);

            let calendarId;
            if (calendars.length === 0) {
                console.log("No calendars found, creating a new one...");
                calendarId = await Calendar.createCalendarAsync({
                    title: "My App Calendar",
                    color: "#007AFF",
                    entityType: Calendar.EntityTypes.EVENT,
                    source: {
                        name: "My App Source",
                        isLocalAccount: true,
                    },
                    name: "myAppCalendar",
                    accessLevel: Calendar.CalendarAccessLevel.OWNER,
                    ownerAccount: "myApp",
                });
                console.log("Created new calendar with ID:", calendarId);
            } else {
                calendarId = calendars[0].id;
            }

            // Tạo sự kiện mẫu cho các ngày khác nhau trong tháng 3/2025
            const sampleEvents = [
                // Ngày 18/03/2025
                {
                    title: "Họp nhóm",
                    startDate: new Date("2025-03-18T09:00:00"),
                    endDate: new Date("2025-03-18T10:30:00"),
                    notes: "Phòng họp A",
                },
                // Ngày 20/03/2025
                {
                    title: "Tập gym",
                    startDate: new Date("2025-03-20T14:30:00"),
                    endDate: new Date("2025-03-20T16:00:00"),
                    notes: "Phòng tập XYZ",
                },
                // Ngày 21/03/2025
                {
                    title: "Học Toán",
                    startDate: new Date("2025-03-21T07:30:00"),
                    endDate: new Date("2025-03-21T09:00:00"),
                    notes: "Gặp thầy Nam",
                },
                {
                    title: "Học Văn",
                    startDate: new Date("2025-03-21T10:30:00"),
                    endDate: new Date("2025-03-21T12:00:00"),
                    notes: "Phòng 301",
                },
                // Ngày 25/03/2025
                {
                    title: "Thuyết trình",
                    startDate: new Date("2025-03-25T13:00:00"),
                    endDate: new Date("2025-03-25T14:30:00"),
                    notes: "Hội trường lớn",
                },
                {
                    title: "Học nhóm",
                    startDate: new Date("2025-03-25T16:00:00"),
                    endDate: new Date("2025-03-25T17:30:00"),
                    notes: "Thư viện",
                },
            ];

            // Xóa tất cả sự kiện cũ trong tháng 3/2025
            const startOfMonth = new Date("2025-03-01");
            startOfMonth.setHours(0, 0, 0, 0);
            const endOfMonth = new Date("2025-03-31");
            endOfMonth.setHours(23, 59, 59, 999);

            const existingEvents = await Calendar.getEventsAsync(
                [calendarId],
                startOfMonth,
                endOfMonth
            );
            console.log("Existing events before deletion:", existingEvents);

            for (const event of existingEvents) {
                await Calendar.deleteEventAsync(event.id);
            }

            // Thêm các sự kiện mẫu
            for (const event of sampleEvents) {
                const eventId = await Calendar.createEventAsync(calendarId, {
                    title: event.title,
                    startDate: event.startDate,
                    endDate: event.endDate,
                    notes: event.notes,
                });
                console.log(`Created event: ${event.title} with ID: ${eventId}`);
            }

            // Lấy sự kiện cho ngày được chọn
            const startOfDay = new Date(selectedDate);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(selectedDate);
            endOfDay.setHours(23, 59, 59, 999);

            const updatedEvents = await Calendar.getEventsAsync(
                [calendarId],
                startOfDay,
                endOfDay
            );
            console.log("Events for", selectedDate.toDateString(), ":", updatedEvents);
            setEvents(updatedEvents);

            // Lấy sự kiện cho cả tháng
            const monthEventsData = await Calendar.getEventsAsync(
                [calendarId],
                startOfMonth,
                endOfMonth
            );
            console.log("Month events:", monthEventsData);
            setMonthEvents(monthEventsData);
        })();
    }, [selectedDate]);

    const getBusySlotsForDay = (date, eventList) => {
        const slots = timeSlots.map((slot) => {
            const slotStart = new Date(date);
            slotStart.setHours(0, 0, 0, 0);
            const [startHour, startMinute] = slot.start.split(":");
            slotStart.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

            const slotEnd = new Date(date);
            slotEnd.setHours(0, 0, 0, 0);
            const [endHour, endMinute] = slot.end.split(":");
            slotEnd.setHours(parseInt(endHour), parseInt(endMinute), 0, 0);

            const event = eventList.find((e) => {
                const eventStart = new Date(e.startDate);
                const eventEnd = new Date(e.endDate);
                return (
                    eventStart.toDateString() === date.toDateString() &&
                    eventStart < slotEnd &&
                    eventEnd > slotStart
                );
            });

            return {
                ...slot,
                isBusy: !!event,
                event: event || null,
            };
        });
        return slots;
    };

    const getBusySlots = (date) => {
        return getBusySlotsForDay(date, events);
    };

    const changeDay = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);
        setSelectedDate(newDate);
    };

    const renderDayView = () => {
        const slots = getBusySlots(selectedDate);
        console.log("Rendering slots:", slots);

        return (
            <View style={styles.dayContainer}>
                <View style={styles.dateNavigator}>
                    <TouchableOpacity onPress={() => changeDay(-1)}>
                        <Ionicons name="chevron-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.dateText}>
                        {selectedDate.toLocaleDateString("vi-VN", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </Text>
                    <TouchableOpacity onPress={() => changeDay(1)}>
                        <Ionicons name="chevron-forward" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={slots}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.slot,
                                item.isBusy ? styles.busySlot : styles.freeSlot,
                            ]}
                            onPress={() => {
                                if (item.isBusy && item.event) {
                                    navigation.navigate("AppointmentDetail", {
                                        event: item.event,
                                    });
                                }
                            }}
                            disabled={!item.isBusy}
                        >
                            <View style={styles.slotTimeContainer}>
                                <Text style={styles.slotTime}>{item.start}</Text>
                                <Text style={styles.slotTime}>{item.end}</Text>
                            </View>
                            <Text style={styles.slotStatus}>
                                {item.isBusy
                                    ? item.event?.title || "Bận"
                                    : "Trống"}
                            </Text>
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        );
    };

    const renderWeekView = () => {
        const markedDates = {};
        const busyCountPerDay = {};

        monthEvents.forEach((event) => {
            const dateStr = new Date(event.startDate).toISOString().split("T")[0];
            const daySlots = getBusySlotsForDay(new Date(dateStr), monthEvents);
            const busyCount = daySlots.filter((slot) => slot.isBusy).length;

            const dots = Array(busyCount).fill({ color: "#FF5555" });

            markedDates[dateStr] = {
                dots: dots.length > 0 ? dots : undefined,
                marked: busyCount > 0,
            };
            busyCountPerDay[dateStr] = busyCount;
        });

        const selectedDateStr = selectedDate.toISOString().split("T")[0];
        markedDates[selectedDateStr] = {
            ...markedDates[selectedDateStr],
            selected: true,
            selectedColor: "#007AFF",
        };

        return (
            <View style={styles.weekContainer}>
                <RNCalendar
                    current={selectedDate.toISOString().split("T")[0]}
                    markedDates={markedDates}
                    markingType={"multi-dot"}
                    onDayPress={(day) => {
                        setSelectedDate(new Date(day.dateString));
                        setViewMode("day");
                    }}
                    theme={{
                        backgroundColor: "#fff",
                        calendarBackground: "#fff",
                        textSectionTitleColor: "#333",
                        selectedDayBackgroundColor: "#007AFF",
                        selectedDayTextColor: "#fff",
                        todayTextColor: "#00adf5",
                        dayTextColor: "#333",
                        textDisabledColor: "#d9e1e8",
                        arrowColor: "#007AFF",
                    }}
                    style={styles.calendar}
                />
                <Text style={styles.weekHint}>
                    {`Ngày ${selectedDate.toLocaleDateString("vi-VN")}: ${
                        busyCountPerDay[selectedDateStr] || 0
                    } slot bận`}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.modeButton,
                        viewMode === "day" && styles.activeButton,
                    ]}
                    onPress={() => setViewMode("day")}
                >
                    <Text style={styles.buttonText}>Theo ngày</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.modeButton,
                        viewMode === "week" && styles.activeButton,
                    ]}
                    onPress={() => setViewMode("week")}
                >
                    <Text style={styles.buttonText}>Theo tuần</Text>
                </TouchableOpacity>
            </View>
            {viewMode === "day" ? renderDayView() : renderWeekView()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 15,
    },
    modeButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        backgroundColor: "#ccc",
        borderRadius: 25,
        marginHorizontal: 10,
    },
    activeButton: {
        backgroundColor: "#007AFF",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    dayContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    dateNavigator: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
        textTransform: "capitalize",
    },
    slot: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    busySlot: {
        backgroundColor: "#FF5555",
    },
    freeSlot: {
        backgroundColor: "#55FF55",
    },
    slotTimeContainer: {
        alignItems: "flex-start",
    },
    slotTime: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
    },
    slotStatus: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
    weekContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    calendar: {
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 20,
    },
    weekHint: {
        textAlign: "center",
        fontSize: 14,
        color: "#666",
    },
});