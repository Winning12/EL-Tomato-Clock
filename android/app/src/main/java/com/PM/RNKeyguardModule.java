package com.PM;

import android.app.KeyguardManager;
import android.os.PowerManager;
import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class RNKeyguardModule extends ReactContextBaseJavaModule{

    private final ReactApplicationContext reactContext;

    public RNKeyguardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }


    protected void sendEvent(ReactContext reactContext,
                             String eventName,
                             boolean isScreenOn) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName,isScreenOn);
    }

    @Override
    public String getName() {
        return "RNKeyguardModule";
    }

    @ReactMethod
    /*public void isLocked(Callback cb) {
        KeyguardManager myKM = (KeyguardManager) reactContext.getSystemService(Context.KEYGUARD_SERVICE);
        if (myKM.inKeyguardRestrictedInputMode()) {
            //it is locked
            cb.invoke(true);
        } else {
            //it is not locked
            cb.invoke(false);
        }
    }*/
    public void isLocked(Callback cb) {
        PowerManager pm = (PowerManager) reactContext.getSystemService(Context.POWER_SERVICE);
        if (pm.isScreenOn()) {
            //it is not locked
            cb.invoke(true);
        } else {
            //it is locked
            cb.invoke(false);
        }
    }
}
