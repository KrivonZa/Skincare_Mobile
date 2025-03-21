import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Calendar as RNCalendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import api from "../../hooks/axiosInstance";
import { useAuth } from "../../context/AuthContext";

export function Schedule() {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]); // Events/shifts for the selected day
    const [monthEvents, setMonthEvents] = useState([]); // Events/shifts for the whole month
    const [viewMode, setViewMode] = useState("day");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { user } = useAuth();

    const timeSlots = [
        { id: 1, start: "07:30", end: "09:00" },
        { id: 2, start: "09:00", end: "10:30" },
        { id: 3, start: "10:30", end: "12:00" },
        { id: 4, start: "13:00", end: "14:30" },
        { id: 5, start: "14:30", end: "16:00" },
        { id: 6, start: "16:00", end: "17:30" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/shifts/account/upcoming/${user._id}`);
                const shifts = response.data;

                // Get events for the whole month
                const startOfMonth = new Date(selectedDate);
                startOfMonth.setDate(1);
                startOfMonth.setHours(0, 0, 0, 0);

                const endOfMonth = new Date(selectedDate);
                endOfMonth.setMonth(endOfMonth.getMonth() + 1);
                endOfMonth.setDate(0);
                endOfMonth.setHours(23, 59, 59, 999);

                const monthShifts = shifts.filter((shift) => {
                    const shiftDate = new Date(shift.date);
                    return shiftDate >= startOfMonth && shiftDate <= endOfMonth;
                });
                setMonthEvents(monthShifts);

                // Get events for the selected day
                const startOfDay = new Date(selectedDate);
                startOfDay.setHours(0, 0, 0, 0);
                const endOfDay = new Date(selectedDate);
                endOfDay.setHours(23, 59, 59, 999);

                const dayShifts = shifts.filter((shift) => {
                    const shiftDate = new Date(shift.date);
                    return shiftDate >= startOfDay && shiftDate <= endOfDay;
                });
                setEvents(dayShifts);

                // console.log("Month shifts:", monthShifts);
                // console.log("Day shifts:", dayShifts);
            } catch (error) {
                // console.error("Error fetching data:", error);
            }
        };

        fetchData();
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

            const event = eventList.find((shift) => {
                const shiftDate = new Date(shift.date);
                const shiftStartTime = shift.slotsId.startTime.split(":");
                const shiftEndTime = shift.slotsId.endTime.split(":");

                const shiftStart = new Date(shiftDate);
                shiftStart.setHours(parseInt(shiftStartTime[0]), parseInt(shiftStartTime[1]), 0, 0);

                const shiftEnd = new Date(shiftDate);
                shiftEnd.setHours(parseInt(shiftEndTime[0]), parseInt(shiftEndTime[1]), 0, 0);

                return (
                    shiftDate.toDateString() === date.toDateString() &&
                    shiftStart < slotEnd &&
                    shiftEnd > slotStart
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

        return (
            <View style={styles.dayContainer}>
                <View style={styles.dateNavigator}>
                    <TouchableOpacity onPress={() => changeDay(-1)}>
                        <Ionicons name="chevron-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.dateText}>
                        {selectedDate.toLocaleDateString("en-US", {
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
                                        appointment: item.event?.appointmentId,
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
                                    ? item.event?.appointmentId?.serviceId?.serviceName
                                    : "Empty"}
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

        monthEvents.forEach((shift) => {
            const dateStr = new Date(shift.date).toISOString().split("T")[0];
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
            selectedColor: "#ff909a",
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
                        selectedDayBackgroundColor: "#ff909a",
                        selectedDayTextColor: "#fff",
                        todayTextColor: "#00adf5",
                        dayTextColor: "#333",
                        textDisabledColor: "#d9e1e8",
                        arrowColor: "#ff909a",
                    }}
                    style={styles.calendar}
                />
                <Text style={styles.weekHint}>
                    {`Date ${selectedDate.toLocaleDateString("en-US")}: ${busyCountPerDay[selectedDateStr] || 0} busy slots`}
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
                    <Text style={styles.buttonText}>By Day</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.modeButton,
                        viewMode === "week" && styles.activeButton,
                    ]}
                    onPress={() => setViewMode("week")}
                >
                    <Text style={styles.buttonText}>By Week</Text>
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
        backgroundColor: "#ff909a",
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
        backgroundColor: "#ff909a",
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
        backgroundColor: "#ff6f61",
    },
    freeSlot: {
        backgroundColor: "#b7b7b7",
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