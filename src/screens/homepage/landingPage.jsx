import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export function LandingPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.firstSection}>
          <Text style={styles.brandName}>metime</Text>
          <Text style={styles.tagline}>Beauty never been so easy.</Text>
          <TouchableOpacity
            style={styles.learnMoreButton}
            onPress={() => navigation.navigate("About")}
          >
            <Text style={styles.buttonText}>Learn More About Us</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.treatmentSection}>
          <Text style={styles.treatmentTitle}>Treatment</Text>
          <Text style={styles.treatmentSubtitle}>
            Give you the best services{"\n"}We can give.
          </Text>

          <View style={styles.treatmentCard}>
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/5248/de06/7c67a715bd33a9ac75f58db3823815bd?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Tpd4X7xJuWxk5Rmg-lROfQz34FSFYXFx6XRJWQ8QZxF9jS9dMPt~ed1uRySvYyyWDUAlbcEYhx-xn5qSJs2uEIwOGJDrgbfEG8GAt2QhKyyBOJvEplPwyRNKrdseMLrO4yjGHj2ZH3gGbfgtrv7aDEktf~EFw4O~M11fw6uSZibEPwZQj1zZWJxFkBlk6ooG-n-1fT29p14OHkhrsiREz1lITY52KmKoYL~4meeTIcviOcykfezCF47a-xB7GbbHF58~48BR~DHbWm985VoxvEmZaDTtnJeZWQMxYyMZ1aOK14OHxP760hFMk2B9jMDGLG5K89IXpzK2arW05A3H9g__",
              }}
              style={styles.treatmentImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dermabrasion</Text>
              <Text style={styles.cardDescription}>
                This is a surgical procedure that uses a rotating instrument to
                remove the outer layers of skin, usually on the face.
              </Text>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => navigation.navigate("TreatmentDetails")}
              >
                <Text style={styles.cardButtonText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAllTreatment")}
          >
            <Text style={styles.viewAllTreatmentButton}>
              View all treatment
            </Text>
          </TouchableOpacity>
        </View>
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
        <View style={styles.treatmentSection}>
          <Text style={styles.treatmentTitle}>Testimonial</Text>
          <Text style={styles.treatmentSubtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>

          <View style={styles.treatmentCard}>
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/a3a0/91c4/e8eb94c62ba383a7e597f3c4cec069b2?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=tWkGFeOiiddcEEsk2fToIW8PMNHmOdZ0LJjJnm5An7YsKnw26Its3W9gO5SVHv-IltynBZVjH3-0bggA6MZpgvsn6zWiTjRX0PYM~cxeeVLWpNGP6xE2vtp2B0VMM5aIFdgd8~mVMvrfbmvBhGRHaFOKOEevXEx6wuit1WLAtauTj49i~A-0siLWZpzDqCIKBaZ33N~ziWEekT9mP81T5nxI7zbz2Sv~HH1rbEclqqTo2vPe-EJgck8crtyE1V2-v~9OeQ6Z53oE7KLLJrBARR8otSEh0hs9pmz0Q-4Kx-EPTdarln73T3Pjyr0yXbT-2LkcK8ZXqVf6tVvAcpgDzw__",
              }}
              style={styles.treatmentImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Andien</Text>
              <Text style={styles.cardDescription}>
                This is a surgical procedure that uses a rotating instrument to
                remove the outer layers of skin, usually on the face.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("TreatmentDetails")}
              >
                <Text style={styles.cardText}>Learn More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAllTreatment")}
          >
            <Text style={styles.viewAllTreatmentButton}>
              View all testimonial
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bookingContent}>
          <Text style={styles.quote}>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. In turpis
            interdum lectus nibh at euismod.”
          </Text>
          <View style={styles.circle}></View>
          <Text style={styles.founder}>
            dr. Arimbi Aditya, Founder of Metime Skincare.
          </Text>
        </View>
        <View style={styles.treatmentSection}>
          <Text style={styles.treatmentTitle}>News & Promo</Text>
          <Text style={styles.treatmentSubtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>

          <View style={styles.treatmentCard}>
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/f08d/ed94/004de3fc45814df9df8c0ff216c96811?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=lorv03AsU1KFopfEFB11hpUG1yXxVJjHOc0nqAq6q4ttGeNjITZU968dm7UifrqZEbAr4z5EDMj1yObnF3rGUltk-BnmxCu5OPUeWQeornNfZcDUeb3U1315LqKx3HP~nHW9nY9YvU0clkHR3v9soO4VWJcTJcpXqVbezCaEThKQKvABo7HoZs0LmCHyM1bMkt1eSb8xRfu2LZ4fNxckz1zmyH5DyrsyfC0xyHPr7x5JLplNqcdnA6XA1afylNt8OuUt3yG6RrWPKkLjVdpoQzTE2TrBtxfyqwg0BieBAboCvI8eZmhq5VRd2eY2XB7hjDhdZxd3T-xeZze-zHQvPA__",
              }}
              style={styles.treatmentImage}
              resizeMode="cover"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitleOrange}>
                Can I Erase My Under Eye Bags?
              </Text>
              <Text style={styles.cardDescription}>
                This is a surgical procedure that uses a rotating instrument to
                remove the outer layers of skin, usually on the face.
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("TreatmentDetails")}
              >
                <Text style={styles.cardText}>View More</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAllTreatment")}
          >
            <Text style={styles.viewAllTreatmentButton}>
              View all News & Promo
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.openHours}>
          <Text style={styles.openTitle}>Open Hours</Text>
          <Text style={styles.openSubtitle}>
            If you feel tired and stressed after a working day, we are happy to
            give you an enjoyable and healthy solution to find your balance
            again.
          </Text>
          <Text style={styles.openTime}>Mon-Fri : 9 AM – 4 PM</Text>
          <Text style={styles.openTime}>Mon-Fri : 9 AM – 4 PM</Text>
          <Text style={styles.openTime}>Mon-Fri : 9 AM – 4 PM</Text>
        </View>
        <View style={styles.bookingContentDown}>
          <Text style={styles.treatSkin}>“Ready to treat your skin?”</Text>
          <Text style={styles.chooseTreatment}>
            Choose your Treatment and Book Now.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAllTreatment")}
          >
            <Text style={styles.bookNowUp}>Book now</Text>
          </TouchableOpacity>

          <Text style={styles.treatSkin}>“Consult your skin”</Text>
          <Text style={styles.chooseTreatmentDown}>Your message</Text>
          <TextInput
            style={styles.input}
            placeholder="Type here"
            placeholderTextColor="gray"
            keyboardType="email-address"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ViewAllTreatment")}
          >
            <Text style={styles.bookNow}>Send message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  firstSection: {
    backgroundColor: "#F06B7E",
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 24,
  },
  learnMoreButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#F06B7E",
    fontSize: 16,
    fontWeight: "600",
  },
  treatmentSection: {
    padding: 20,
  },
  treatmentTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  treatmentSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    lineHeight: 24,
    textAlign: "center",
  },
  treatmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginBottom: 10,
  },
  treatmentImage: {
    width: "100%",
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
    lineHeight: 20,
  },
  cardButton: {
    backgroundColor: "#F06B7E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  viewAllTreatmentButton: {
    backgroundColor: "#F06B7E",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    color: "white",
  },
  bookingContent: {
    backgroundColor: "#F06B7E",
    paddingTop: 40,
    paddingBottom: 40,
    display: "flex",
    alignItems: "center",
  },
  userProfile: {
    backgroundColor: "white",
    paddingTop: 40,
    paddingBottom: 40,
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
  cardText: {
    color: "blue",
    fontSize: 14,
    fontWeight: "600",
  },
  quote: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
    textAlign: "center",
  },
  founder: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    lineHeight: 14,
    textAlign: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: "white",
  },
  cardTitleOrange: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 8,
  },
  openTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#F06B7E",
    marginBottom: 8,
    textAlign: "left",
    marginLeft: 10,
    marginTop: 30,
  },
  openSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
    textAlign: "left",
    marginLeft: 10,
  },
  openTime: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    lineHeight: 14,
    textAlign: "left",
    marginLeft: 10,
  },
  treatSkin: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
    lineHeight: 24,
    textAlign: "center",
  },
  chooseTreatment: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    lineHeight: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  chooseTreatmentDown: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    lineHeight: 14,
    textAlign: "left",
    marginBottom: 70,
    marginLeft: 30,
  },
  bookNowUp: {
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    color: "#F06B7E",
    marginBottom: 150,
  },
  bookNow: {
    backgroundColor: "white",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "center",
    color: "#F06B7E",
  },
  bookingContentDown: {
    backgroundColor: "#F06B7E",
    paddingTop: 40,
    paddingBottom: 40,
    display: "flex",
    alignItems: "Left",
  },
  input: {
    backgroundColor: "pink",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10,
  },
});
