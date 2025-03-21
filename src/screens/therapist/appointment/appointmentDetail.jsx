import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import api from "../../../hooks/axiosInstance";

export function AppointmentDetail() {
    const route = useRoute();
    const { appointment } = route.params;
    console.log(appointment)

    const [checkInImage, setCheckInImage] = useState(appointment.checkInImage);
    const [checkOutImage, setCheckOutImage] = useState(appointment.checkOutImage);
    const [status, setStatus] = useState(appointment.status);
    const [selectedStatus, setSelectedStatus] = useState(appointment.status);
    const [loading, setLoading] = useState(false);
    const [newCheckInImage, setNewCheckInImage] = useState(null);
    const [newCheckOutImage, setNewCheckOutImage] = useState(null);

    // Kiểm tra và yêu cầu quyền camera/library khi component mount
    useEffect(() => {
        const requestPermissions = async () => {
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!cameraStatus.granted || !libraryStatus.granted) {
                Alert.alert(
                    "Permissions Required",
                    "Camera and photo library access are needed to upload or capture images.",
                    [{ text: "OK", onPress: () => console.log("Permissions denied") }]
                );
            }
        };
        requestPermissions();
    }, []);

    // Hàm chọn ảnh từ thư viện
    const pickImage = async (type) => {
        if (status !== "In Progress") {
            Alert.alert("Restricted", "Images can only be updated when status is 'In Progress'.");
            return;
        }

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ cho phép chọn ảnh
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setLoading(true);
                const imageUri = result.assets[0].uri;
                type === "checkIn" ? setNewCheckInImage(imageUri) : setNewCheckOutImage(imageUri);
            } else {
                console.log("Image picking cancelled");
            }
        } catch (error) {
            console.error("Error picking image:", error);
            Alert.alert("Error", "Failed to pick image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Hàm chụp ảnh bằng camera
    const captureImage = async (type) => {
        if (status !== "In Progress") {
            Alert.alert("Restricted", "Images can only be updated when status is 'In Progress'.");
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setLoading(true);
                const imageUri = result.assets[0].uri;
                type === "checkIn" ? setNewCheckInImage(imageUri) : setNewCheckOutImage(imageUri);
            } else {
                console.log("Image capture cancelled");
            }
        } catch (error) {
            console.error("Error capturing image:", error);
            Alert.alert("Error", "Failed to capture image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const updateAppointment = async () => {
        setLoading(true);
        try {
            const formData = new FormData();

            if (newCheckInImage) {
                formData.append("checkInImage", {
                    uri: newCheckInImage,
                    type: "image/jpeg",
                    name: `checkInImage_${appointment._id}.jpg`,
                });
            }

            if (newCheckOutImage) {
                formData.append("checkOutImage", {
                    uri: newCheckOutImage,
                    type: "image/jpeg",
                    name: `checkOutImage_${appointment._id}.jpg`,
                });
            }

            if (selectedStatus !== status) {
                formData.append("status", selectedStatus);
            }

            if (!newCheckInImage && !newCheckOutImage && selectedStatus === status) {
                Alert.alert("No Change", "No updates to apply.");
                setLoading(false);
                return;
            }

            await api.patch(`/appointment/JWT/${appointment._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (newCheckInImage) setCheckInImage(newCheckInImage);
            if (newCheckOutImage) setCheckOutImage(newCheckOutImage);
            if (selectedStatus !== status) setStatus(selectedStatus);

            Alert.alert("Success", "Appointment updated successfully.");
        } catch (error) {
            console.error("Error updating appointment:", error);
            Alert.alert("Error", "Failed to update appointment. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = () => {
        const validTransitions = {
            Scheduled: ["In Progress", "Cancelled"],
            "In Progress": ["Completed", "Cancelled"],
        };

        if (!newCheckInImage && !newCheckOutImage && selectedStatus === status) {
            Alert.alert("No Change", "Please make changes to update.");
            return;
        }

        if (selectedStatus !== status && !validTransitions[status]?.includes(selectedStatus)) {
            Alert.alert(
                "Invalid Action",
                `Cannot transition from "${status}" to "${selectedStatus}".`
            );
            return;
        }

        // Kiểm tra nếu muốn chuyển sang "Completed"
        if (selectedStatus === "Completed") {
            const hasCheckInImage = newCheckInImage || checkInImage;
            const hasCheckOutImage = newCheckOutImage || checkOutImage;

            if (!hasCheckInImage || !hasCheckOutImage) {
                Alert.alert(
                    "Missing Images",
                    "Both Check-In and Check-Out images must be uploaded to mark the appointment as Completed."
                );
                return;
            }
        }

        Alert.alert(
            "Confirm Update",
            "Are you sure you want to update the appointment?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Yes", onPress: updateAppointment },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.topSection}>
                    <Text style={styles.title}>{appointment.serviceId.serviceName}</Text>
                    <Text style={styles.statusBadge(status)}>{status}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Appointment Details</Text>
                    <View style={styles.detailRow}>
                        <Ionicons name="person-outline" size={20} color="#666" />
                        <Text style={styles.detailText}>
                            Customer: {appointment.customerId.username}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="calendar-outline" size={20} color="#666" />
                        <Text style={styles.detailText}>
                            Date: {new Date(appointment.createdAt).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="time-outline" size={20} color="#666" />
                        <Text style={styles.detailText}>
                            Time: {appointment.slotsId.startTime} - {appointment.slotsId.endTime}
                        </Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Ionicons name="cash-outline" size={20} color="#666" />
                        <Text style={styles.detailText}>Price: ${appointment.amount}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Images</Text>

                    <Text style={styles.subTitle}>Check-In</Text>
                    {newCheckInImage || checkInImage ? (
                        <Image source={{ uri: newCheckInImage || checkInImage }} style={styles.image} />
                    ) : (
                        <Text style={styles.noImageText}>No Check-In Image Uploaded</Text>
                    )}
                    {status === "In Progress" && (
                        <View style={styles.imageButtons}>
                            <TouchableOpacity
                                style={[styles.actionButton, loading && styles.disabledButton]}
                                onPress={() => pickImage("checkIn")}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <>
                                        <Ionicons name="image-outline" size={20} color="#fff" />
                                        <Text style={styles.actionButtonText}>Upload</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, loading && styles.disabledButton]}
                                onPress={() => captureImage("checkIn")}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <>
                                        <Ionicons name="camera-outline" size={20} color="#fff" />
                                        <Text style={styles.actionButtonText}>Capture</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    <Text style={styles.subTitle}>Check-Out</Text>
                    {newCheckOutImage || checkOutImage ? (
                        <Image source={{ uri: newCheckOutImage || checkOutImage }} style={styles.image} />
                    ) : (
                        <Text style={styles.noImageText}>No Check-Out Image Uploaded</Text>
                    )}
                    {status === "In Progress" && (
                        <View style={styles.imageButtons}>
                            <TouchableOpacity
                                style={[styles.actionButton, loading && styles.disabledButton]}
                                onPress={() => pickImage("checkOut")}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <>
                                        <Ionicons name="image-outline" size={20} color="#fff" />
                                        <Text style={styles.actionButtonText}>Upload</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionButton, loading && styles.disabledButton]}
                                onPress={() => captureImage("checkOut")}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <>
                                        <Ionicons name="camera-outline" size={20} color="#fff" />
                                        <Text style={styles.actionButtonText}>Capture</Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Status</Text>
                    <Picker
                        selectedValue={selectedStatus}
                        onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                        style={styles.picker}
                        enabled={!loading && status !== "Completed" && status !== "Cancelled"}
                        dropdownIconColor="#666"
                    >
                        <Picker.Item label="Scheduled" value="Scheduled" />
                        <Picker.Item label="In Progress" value="In Progress" />
                        <Picker.Item label="Completed" value="Completed" />
                        <Picker.Item label="Cancelled" value="Cancelled" />
                    </Picker>
                </View>

                <TouchableOpacity
                    style={[styles.updateButton, loading && styles.disabledButton]}
                    onPress={handleUpdate}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.updateButtonText}>Update Appointment</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        padding: 20,
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#333",
        flex: 1,
    },
    statusBadge: (status) => ({
        fontSize: 14,
        fontWeight: "600",
        color: "#fff",
        backgroundColor:
            status === "Scheduled"
                ? "#ff909a"
                : status === "In Progress"
                    ? "#ffa726"
                    : status === "Completed"
                        ? "#66bb6a"
                        : "#ef5350",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    }),
    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
        marginBottom: 15,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#555",
        marginBottom: 10,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    detailText: {
        fontSize: 16,
        color: "#666",
        marginLeft: 10,
    },
    image: {
        width: "100%",
        height: 180,
        borderRadius: 10,
        marginBottom: 15,
    },
    noImageText: {
        fontSize: 14,
        color: "#999",
        textAlign: "center",
        marginBottom: 15,
    },
    imageButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    actionButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ff909a",
        paddingVertical: 12,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    updateButton: {
        backgroundColor: "#ff909a",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    disabledButton: {
        backgroundColor: "#ccc",
    },
});