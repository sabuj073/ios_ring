import React, { Component, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import { WebView } from "react-native-webview";
import LottieView from "lottie-react-native";

export default class WebViewMoviezSpace extends Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
    this.state = { visible: true };
  }

  hideSpinner() {
    this.setState({ visible: false });
  }
  showSpinner() {
    this.setState({ visible: true });
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  };
  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  onLoadStateChange(event) {
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden />
        <WebView
          source={{ uri: "https://ringme.com.bd/" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          ref={this.WEBVIEW_REF}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
        {this.state.visible && (
          <View style={styles.ActivityIndicatorStyle}>
            <LottieView
              style={{ backgroundColor: "#fff" }}
              source={require("./assets/loader.json")}
              autoPlay
              loop
            />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ActivityIndicatorStyle: {
    position: "absolute",

    flex: 1,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});
