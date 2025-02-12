import { View, StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function Benefit() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.bookingContent}>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/f87a/f511/a7ce8cef84fb14d5661fbee112f3cbc6?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FBChJ4wN2UbwPZ3zQ2-zjdhq9gDYoxbkWQo025Tw~TSMElHxtKxSceS8auZsACIPSxYjWv1RdKlkMm1X4Y~duXd9vE3SSb-c65GtDjgRz9ES-EHrlI1Leh3XFw1uY-LmWfR0VLnzog09uQCbMdQN0xlREsMmfR5gBtr1zgRBSiH~FYGA8qymQVARdP-4npF7nAsPOsIbNMCCcAKbjyA1DPxUuWMBJU6sdZ~uhmJhi4pgtfuQ5qSiDXdgrjFK1xj85cx40fH51hXj5Aw6ZH6G-7ds9ujAngqcoMzkB9tjh1RV6TwoF0wp0ZOBW9zQ6RZGvztFIpJLeX-SsqGSLjF2tg__",
          }}
          style={styles.iconImage}
          resizeMode="cover"
        />
        <Text style={styles.contentTitle}>Easy book & Payment</Text>
        <Text style={styles.contentSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
          velit orci, morbi sociis feugiat eros quam. Fermentum proin faucibus
          egestas ac gravida nulla montes.
        </Text>
      </View>
      <View style={styles.userProfile}>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/44c1/952b/02f20d9f5a3f60fac0cf4a1f5f6cd4c2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ci4GTbOTabjGkhQrNcbC226igNQ-BLDPYYcDOsji7q2RZ7YCdalV35JxI0Ohh4rmbv~u-W4rZ2bmGcihusVtaSXg0Vgy1yG1KJDzi-a1fe69Gc-ZjgU0VFHOtqWqxTizxQfsArwrl0oXtTRFpGxAokbwFF86uWGmiMujbcwXyYIlKzSSIvsG9NhFuOqRCgxxY6azGLsJQIQ1CfbxAalWXTzlQnWLNdk65AahbbPwwKwOw8KY1KY7hPfSnIGiAofh90VRXCp1jU-DtDSqeD7Eb0CNZp5M1Z~RoNlsDyTfBitjSgYSCgJhYDlXOMEVmllScSuq6vUY~OAj46QO-jpuUQ__",
          }}
          style={styles.iconImage}
          resizeMode="cover"
        />
        <Text style={styles.contentTitle}>User Profile Management</Text>
        <Text style={styles.contentSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
          velit orci, morbi sociis feugiat eros quam. Fermentum proin faucibus
          egestas ac gravida nulla montes.
        </Text>
      </View>
      <View style={styles.bookingContent}>
        <Image
          source={{
            uri: "https://s3-alpha-sig.figma.com/img/fb70/f4d8/ab4eaa583573cedce9f7b7a12299f9dc?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n0TdPdRU6QflcQcFT1nxWvc11bwJkePgk9TKnr1bRGkTvh-pjM6~di-NInd5fKZXy2Udz5aosfjeuTm5Q8q2gpLDpvYVMIgp7Lkl-OVJ-yZLRK7btAo9eWFdXHkaCXq0ZiqBo3cKvNQLfquJ6Wh5a~2CI8ITgMpFlHeTcDUOmqR1DFYxebsk~eT~aQ4WjirK0kgKhTLU3X~mVPOnen-p58nVqb8qgyo7MNBheaVcrcEnl7tWKDR9TN2YtOq8gtrJDMU9vD5EWGsx-s0gb3kZfLTlSoboCdcAVmXyhHfNtLq81BS-AY9VGPN~7JHBlU58BeID0SM2LPuWlIBqK9XSjA__",
          }}
          style={styles.iconImage}
          resizeMode="cover"
        />
        <Text style={styles.contentTitle}>Awards and Recognition</Text>
        <Text style={styles.contentSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Imperdiet
          velit orci, morbi sociis feugiat eros quam. Fermentum proin faucibus
          egestas ac gravida nulla montes.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookingContent: {
    backgroundColor: "#fce1e5",
    paddingVertical: 40,
    display: "flex",
    alignItems: "center",
  },
  userProfile: {
    backgroundColor: "#F8F8F8",
    paddingVertical: 40,
    display: "flex",
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  contentTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    lineHeight: 36,
    textAlign: "center",
  },
  contentSubtitle: {
    fontSize: 10,
    color: "#666",
    lineHeight: 14,
    textAlign: "center",
  },
});
