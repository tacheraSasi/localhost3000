import { useCurrentTheme } from "@/context/CentralTheme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function PortainerWebView() {
  const theme = useCurrentTheme();
  const router = useRouter();
  const { url } = useLocalSearchParams<{ url: string }>();
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url || "");

  const handleDisconnect = () => {
    router.back();
  };

  const handleGoBack = () => {
    if (canGoBack) {
      webViewRef.current?.goBack();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    webViewRef.current?.reload();
  };

  if (!url) {
    return (
      <SafeAreaView
        style={[styles.errorContainer, { backgroundColor: theme.background }]}
      >
        <Text style={[styles.errorText, { color: theme.error }]}>
          No URL provided
        </Text>
        <TouchableOpacity onPress={handleDisconnect}>
          <Text style={[styles.errorLink, { color: "#0db7ed" }]}>
            Go back to config
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header bar */}
      <SafeAreaView
        edges={["top"]}
        style={[styles.headerSafeArea, { backgroundColor: "#2c3e50" }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={[
              styles.headerButton,
              !canGoBack && styles.headerButtonDisabled,
            ]}
            disabled={!canGoBack}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={canGoBack ? "#ffffff" : "#ffffff50"}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.urlRow}>
              <Ionicons
                name={
                  currentUrl.startsWith("https") ? "lock-closed" : "lock-open"
                }
                size={12}
                color={currentUrl.startsWith("https") ? "#23ae89" : "#ff9500"}
              />
              <Text style={styles.headerUrl} numberOfLines={1}>
                {currentUrl.replace(/^https?:\/\//, "")}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={handleRefresh} style={styles.headerButton}>
            <Ionicons name="refresh" size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleDisconnect}
            style={styles.headerButton}
          >
            <Ionicons name="log-out-outline" size={20} color="#BE2044" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Loading indicator */}
      {isLoading && (
        <View style={[styles.loadingBar, { backgroundColor: "#0db7ed" }]}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      {/* WebView with pull-to-refresh */}
      {Platform.OS === "ios" ? (
        <ScrollView
          style={styles.webviewContainer}
          contentContainerStyle={styles.webviewContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#0db7ed"
            />
          }
          scrollEnabled={false}
        >
          <WebView
            ref={webViewRef}
            source={{ uri: url }}
            style={styles.webview}
            onNavigationStateChange={(navState) => {
              setCanGoBack(navState.canGoBack);
              setCurrentUrl(navState.url);
            }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => {
              setIsLoading(false);
              setRefreshing(false);
            }}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState={false}
            allowsBackForwardNavigationGestures
            pullToRefreshEnabled
          />
        </ScrollView>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          style={styles.webview}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
            setCurrentUrl(navState.url);
          }}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => {
            setIsLoading(false);
            setRefreshing(false);
          }}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState={false}
          allowsBackForwardNavigationGestures
          pullToRefreshEnabled
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSafeArea: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerButtonDisabled: {
    opacity: 0.4,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  urlRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    maxWidth: "100%",
  },
  headerUrl: {
    color: "#ecf0f1",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flexShrink: 1,
  },
  loadingBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    gap: 8,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Inter_500Medium",
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  errorLink: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
