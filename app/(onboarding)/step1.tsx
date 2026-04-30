import ScreenLayout from "@/components/ScreenLayout";
import { useCurrentTheme } from "@/context/CentralTheme";
import { useSession } from "@/context/ctx";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingStep1() {
  const theme = useCurrentTheme();
  const { completeOnboarding } = useSession();

  return (
    <ScreenLayout>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Top accent bar */}
        <View style={[styles.accentBar, { backgroundColor: "#BE2044" }]} />

        <View style={styles.content}>
          {/* Logo section */}
          <View style={styles.logoSection}>
            <View style={[styles.logoBox, { backgroundColor: "#2c3e50" }]}>
              <Ionicons name="server" size={48} color="#ffffff" />
            </View>
            <Text style={[styles.appName, { color: theme.text }]}>
              localhost
              <Text style={{ color: "#BE2044" }}>3000</Text>
            </Text>
            <Text style={[styles.tagline, { color: theme.mutedText }]}>
              Portainer in your pocket
            </Text>
          </View>

          {/* Features */}
          <View style={styles.features}>
            <FeatureItem
              icon="globe-outline"
              title="Access Portainer Anywhere"
              description="Connect to your Portainer instance directly from your phone"
              textColor={theme.text}
              mutedColor={theme.mutedText}
            />
            <FeatureItem
              icon="shield-checkmark-outline"
              title="Privacy First"
              description="No data is sent to any remote server. Everything stays on your device"
              textColor={theme.text}
              mutedColor={theme.mutedText}
            />
            <FeatureItem
              icon="flash-outline"
              title="Quick & Lightweight"
              description="A simple WebView wrapper — no bloat, just your Portainer dashboard"
              textColor={theme.text}
              mutedColor={theme.mutedText}
            />
          </View>

          {/* Get Started button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2c3e50" }]}
            onPress={completeOnboarding}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
}

function FeatureItem({
  icon,
  title,
  description,
  textColor,
  mutedColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  textColor: string;
  mutedColor: string;
}) {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: "#0db7ed15" }]}>
        <Ionicons name={icon} size={24} color="#0db7ed" />
      </View>
      <View style={styles.featureText}>
        <Text style={[styles.featureTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.featureDesc, { color: mutedColor }]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accentBar: {
    height: 4,
    width: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginTop: 60,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  appName: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    marginTop: 8,
  },
  features: {
    gap: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
});
