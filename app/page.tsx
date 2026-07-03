"use client";
import { useEffect, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import { LoginScreen } from "@/screens/LoginScreen";
import { WelcomeScreen } from "@/screens/WelcomeScreen";
import { CreateTwinCameraScreen } from "@/screens/CreateTwinCameraScreen";
import { CustomizeTwinScreen } from "@/screens/CustomizeTwinScreen";
import { PairDeviceScreen } from "@/screens/PairDeviceScreen";
import { ProfileFormScreen } from "@/screens/ProfileFormScreen";
import { TwinGenerationScreen } from "@/screens/TwinGenerationScreen";
import { ProcessingScreen } from "@/screens/ProcessingScreen";
import { HomeScreen } from "@/screens/HomeScreen";
import { TwinScreen } from "@/screens/TwinScreen";
import { LogInputScreen } from "@/screens/LogInputScreen";
import { ProgressScreen } from "@/screens/ProgressScreen";
import { Projection5yScreen } from "@/screens/Projection5yScreen";
import { RecommendationsScreen } from "@/screens/RecommendationsScreen";
import { AlertsScreen } from "@/screens/AlertsScreen";
import { SubIndexDetailScreen } from "@/screens/SubIndexDetailScreen";
import { DoctorReportScreen } from "@/screens/DoctorReportScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { liveICM } from "@/lib/icm";
import type {
  Meal,
  PairedDevice,
  ScreenId,
  SubIndexKey,
  TwinAppearance,
} from "@/lib/types";

const ONBOARDING: ScreenId[] = [
  "login",
  "welcome",
  "createTwin",
  "twinGenerating",
  "customize",
  "profileForm",
  "pairDevice",
  "processing",
];

const DEFAULT_APPEARANCE: TwinAppearance = {
  skinTone: 1,
  hair: "corto",
  glasses: false,
  presentation: "masculina",
};

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("login");
  const [subIndex, setSubIndex] = useState<SubIndexKey>("Sueño");
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [pairedDevice, setPairedDevice] = useState<PairedDevice | null>(null);
  const [pairReturnTo, setPairReturnTo] = useState<ScreenId>("processing");
  const [doctorReturnTo, setDoctorReturnTo] = useState<ScreenId>("profile");
  const [projectionReturnTo, setProjectionReturnTo] = useState<ScreenId>("progress");
  const [appearance, setAppearance] = useState<TwinAppearance>(DEFAULT_APPEARANCE);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [useImage, setUseImage] = useState(false);
  const [alertsRead, setAlertsRead] = useState(false);

  const isOnboarding = ONBOARDING.includes(screen);

  useEffect(() => {
    if (screen === "alerts") setAlertsRead(true);
  }, [screen]);

  const startPairFrom = (returnTo: ScreenId) => {
    setPairReturnTo(returnTo);
    setScreen("pairDevice");
  };

  const openDoctorFrom = (returnTo: ScreenId) => {
    setDoctorReturnTo(returnTo);
    setScreen("doctor");
  };

  const openProjectionFrom = (returnTo: ScreenId) => {
    setProjectionReturnTo(returnTo);
    setScreen("projection");
  };

  const logout = () => {
    setScreen("login");
    setMeals([]);
    setPairedDevice(null);
    setUserPhoto(null);
    setUseImage(false);
    setAppearance(DEFAULT_APPEARANCE);
    setAlertsRead(false);
  };

  return (
    <PhoneFrame>
      <div key={screen} className="h-full animate-[fadeIn_240ms_ease-out]">
        {screen === "login" && (
          <LoginScreen onNav={setScreen} appearance={appearance} />
        )}
        {screen === "welcome" && (
          <WelcomeScreen onNav={setScreen} appearance={appearance} useImage={useImage} />
        )}
        {screen === "createTwin" && (
          <CreateTwinCameraScreen onNav={setScreen} setUserPhoto={setUserPhoto} />
        )}
        {screen === "twinGenerating" && (
          <TwinGenerationScreen
            onNav={setScreen}
            onComplete={() => setUseImage(true)}
          />
        )}
        {screen === "customize" && (
          <CustomizeTwinScreen
            onNav={setScreen}
            onContinue={() => {
              setPairReturnTo("processing");
              setScreen("profileForm");
            }}
            appearance={appearance}
            setAppearance={setAppearance}
            userPhoto={userPhoto}
            useImage={useImage}
          />
        )}
        {screen === "profileForm" && <ProfileFormScreen onNav={setScreen} />}
        {screen === "pairDevice" && (
          <PairDeviceScreen
            onNav={setScreen}
            onPaired={setPairedDevice}
            returnTo={pairReturnTo}
          />
        )}
        {screen === "processing" && (
          <ProcessingScreen onNav={setScreen} appearance={appearance} useImage={useImage} />
        )}
        {screen === "home" && (
          <HomeScreen
            onNav={setScreen}
            appearance={appearance}
            useImage={useImage}
            icm={liveICM(meals)}
            meals={meals}
            alertsUnread={!alertsRead}
            onOpenSubIndex={(k) => {
              setSubIndex(k);
              setScreen("subIndex");
            }}
          />
        )}
        {screen === "twin" && (
          <TwinScreen
            appearance={appearance}
            useImage={useImage}
            icmBase={liveICM(meals)}
            onOpenProjection={() => openProjectionFrom("twin")}
          />
        )}
        {screen === "log" && (
          <LogInputScreen onNav={setScreen} meals={meals} setMeals={setMeals} />
        )}
        {screen === "progress" && (
          <ProgressScreen
            onOpenProjection={() => openProjectionFrom("progress")}
            onOpenDoctor={() => openDoctorFrom("progress")}
          />
        )}
        {screen === "projection" && (
          <Projection5yScreen onBack={() => setScreen(projectionReturnTo)} />
        )}
        {screen === "recommendations" && <RecommendationsScreen onNav={setScreen} />}
        {screen === "alerts" && <AlertsScreen onNav={setScreen} />}
        {screen === "subIndex" && (
          <SubIndexDetailScreen onNav={setScreen} subIndexKey={subIndex} />
        )}
        {screen === "doctor" && (
          <DoctorReportScreen onBack={() => setScreen(doctorReturnTo)} />
        )}
        {screen === "profile" && (
          <ProfileScreen
            appearance={appearance}
            useImage={useImage}
            pairedDevice={pairedDevice}
            onStartPair={() => startPairFrom("profile")}
            onOpenDoctor={() => openDoctorFrom("profile")}
            onLogout={logout}
          />
        )}
      </div>

      {!isOnboarding && <TabBar active={screen} onNav={setScreen} />}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

    </PhoneFrame>
  );
}
