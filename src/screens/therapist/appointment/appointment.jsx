import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../hooks/axiosInstance";

export function Appointment() {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const { user } = useAuth();
    const [sortOrder, setSortOrder] = useState("newest");
    const [statusFilter, setStatusFilter] = useState("Scheduled");
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const response = await api.get(`/appointment/account/${user._id}`);
            const data = response.data;
            setAppointments(data);
            setFilteredAppointments(data.filter((appt) => appt.status === statusFilter));
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };

    const sortAppointments = (order) => {
        const sorted = [...filteredAppointments].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return order === "newest" ? dateB - dateA : dateA - dateB;
        });
        setFilteredAppointments(sorted);
        setSortOrder(order);
    };

    const filterByStatus = (status) => {
        const filtered =
            status === "All"
                ? appointments
                : appointments.filter((appt) => appt.status === status);
        setFilteredAppointments(filtered);
        setStatusFilter(status);
    };

    const renderAppointment = ({ item }) => (
        <TouchableOpacity
            style={styles.appointmentCard}
            onPress={() => navigation.navigate("AppointmentDetail", { appointment: item })}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.serviceName}>{item.serviceId.serviceName}</Text>
                <Text style={styles.statusBadge(item.status)}>{item.status}</Text>
            </View>
            <Text style={styles.detailText}>
                Customer: {item.customerId.username}
            </Text>
            <Text style={styles.detailText}>
                Date: {new Date(item.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.detailText}>
                Time: {item.slotsId.startTime} - {item.slotsId.endTime}
            </Text>
            <Text style={styles.priceText}>${item.amount}</Text>
        </TouchableOpacity>
    );

    const renderFilterItem = (item) => (
        <TouchableOpacity
            key={item} // Added key here
            style={[
                styles.filterButton,
                statusFilter === item && styles.activeFilterButton,
            ]}
            onPress={() => filterByStatus(item)}
        >
            <Text
                style={[
                    styles.filterButtonText,
                    statusFilter === item && styles.activeFilterText,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.sortContainer}>
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={() => sortAppointments(sortOrder === "newest" ? "oldest" : "newest")}
                    >
                        <Ionicons
                            name={sortOrder === "newest" ? "arrow-down" : "arrow-up"}
                            size={20}
                            color="#fff"
                        />
                        <Text style={styles.sortButtonText}>
                            {sortOrder === "newest" ? "Newest" : "Oldest"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}
                >
                    {["All", "Scheduled", "In Progress", "Completed", "Cancelled"].map((item) =>
                        renderFilterItem(item)
                    )}
                </ScrollView>
            </View>

            <FlatList
                data={filteredAppointments}
                renderItem={renderAppointment}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No appointments found</Text>
                }
                contentContainerStyle={styles.listContent}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    headerContainer: {
        zIndex: 1,
        backgroundColor: "#f5f5f5",
    },
    sortContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: "stretch",
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ff909a",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sortButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 5,
    },
    filterContainer: {
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ff909a",
    },
    activeFilterButton: {
        backgroundColor: "#ff909a",
        borderColor: "#ff909a",
    },
    filterButtonText: {
        color: "#ff909a",
        fontSize: 14,
        fontWeight: "500",
    },
    activeFilterText: {
        color: "#fff",
    },
    listContent: {
        padding: 15,
        flexGrow: 1,
    },
    appointmentCard: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        flex: 1,
    },
    statusBadge: (status) => ({
        fontSize: 12,
        color: "#fff",
        backgroundColor:
            status === "Scheduled"
                ? "#ff909a"
                : status === "In Progress"
                    ? "#ffa726"
                    : status === "Completed"
                        ? "#66bb6a"
                        : "#ef5350",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    }),
    detailText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    priceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ff909a",
        marginTop: 5,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#666",
        marginTop: 20,
    },
});

export default Appointment;