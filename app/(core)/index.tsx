import ScreenLayout from "@/components/ScreenLayout";
import { useCurrentTheme } from "@/context/CentralTheme";
import { useSettingsStore } from "@/stores/settings";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function ConfigScreen() {
  const theme = useCurrentTheme();
  const router = useRouter();
  const { savePortainerUrl, savedUrl, setSavePortainerUrl, setSavedUrl } =
    useSettingsStore();

  const [url, setUrl] = useState(savedUrl || "");

  useEffect(() => {
    if (savePortainerUrl && savedUrl) {
      setUrl(savedUrl);
    }
  }, []);

  const handleConnect = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      Alert.alert("URL Required", "Please enter your Portainer URL.");
      return;
    }

    // Basic URL validation
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      Alert.alert(
        "Invalid URL",
        "URL must start with http:// or https://"
      );
      return;
    }

    if (savePortainerUrl) {
      setSavedUrl(trimmed);
    }

    router.push({
      pathname: "/(core)/webview" as any,
      params: { url: trimmed },
    });
  };

  return (
    <ScreenLayout keyboardAware>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={[styles.scrollView, { backgroundColor: theme.background }]}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top accent bar */}
          <View style={[styles.accentBar, { backgroundColor: "#BE2044" }]} />

          {/* Header */}
          <View style={styles.header}>
            <View style={[styles.logoBox, { backgroundColor: "#2c3e50" }]}>
              <Ionicons name="server" size={40} color="#ffffff" />
            </View>
            <Text style={[styles.appName, { color: theme.text }]}>
              localhost
              <Text style={{ color: "#BE2044" }}>3000</Text>
            </Text>
            <Text style={[styles.subtitle, { color: theme.mutedText }]}>
              Connect to your Portainer instance
            </Text>
          </View>

          {/* URL Input */}
          <View style={styles.inputSection}>
            <Text style={[styles.label, { color: theme.text }]}>
              Portainer URL
            </Text>
            <View
              style={[
                styles.inputContainer,
                {
                  backgroundColor: theme.inputBackground,
                  borderColor: theme.inputBorder,
                },
              ]}
            >
              <Ionicons
                name="link-outline"
                size={20}
                color={theme.inputPlaceholder}
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, { color: theme.inputText }]}
                placeholder="https://portainer.yourdomain.com"
                placeholderTextColor={theme.inputPlaceholder}
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                returnKeyType="go"
                onSubmitEditing={handleConnect}
              />
            </View>
          </View>

          {/* Save URL Toggle */}
          <View
            style={[
              styles.settingRow,
              {
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="bookmark-outline" size={20} color="#0db7ed" />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: theme.text }]}>
                  Save URL for later
                </Text>
                <Text
                  style={[styles.settingDesc, { color: theme.mutedText }]}
                >
                  Remember this URL so you don't have to type it again
                </Text>
              </View>
            </View>
            <Switch
              value={savePortainerUrl}
              onValueChange={setSavePortainerUrl}
              trackColor={{ false: theme.border, true: "#23ae89" }}
              thumbColor="#ffffff"
            />
          </View>

          {/* Connect Button */}
          <TouchableOpacity
            style={[styles.connectButton, { backgroundColor: "#2c3e50" }]}
            onPress={handleConnect}
            activeOpacity={0.8}
          >
            <Ionicons name="open-outline" size={20} color="#ffffff" />
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>

          {/* Privacy Disclosure */}
          <View
            style={[
              styles.disclosure,
              {
                backgroundColor: theme.isDark ? "#1e2a35" : "#e8e0f0",
                borderColor: theme.isDark ? "#3d4f5f" : "#d0c8e0",
              },
            ]}
          >
            <Ionicons
              name="shield-checkmark"
              size={20}
              color="#23ae89"
              style={styles.disclosureIcon}
            />
            <Text style={[styles.disclosureText, { color: theme.text }]}>
              <Text style={styles.disclosureBold}>Privacy Notice: </Text>
              localhost3000 does not save your data to any remote location. All
              data, including your Portainer URL, is stored only on your device.
              We never collect, transmit, or share any of your information.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  accentBar: {
    height: 4,
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginTop: 48,
    marginBottom: 40,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 30,
    fontFamily: "Inter_700Bold",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    marginTop: 6,
  },
  inputSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 12,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 18,
  },
  connectButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 32,
  },
  connectButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
  },
  disclosure: {
    flexDirection: "row",
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "flex-start",
    gap: 12,
  },
  disclosureIcon: {
    marginTop: 2,
  },
  disclosureText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
  },
  disclosureBold: {
    fontFamily: "Inter_600SemiBold",
  },
});
