package com.rn;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

public class MyCustomViewManager extends SimpleViewManager<MyCustomView> {
    private static final int CHANGE_COLOR = 1;

    @Override
    public String getName() {
        return "MyCustomView";
    }

    @Override
    protected MyCustomView createViewInstance(ThemedReactContext reactContext) {
        return new MyCustomView(reactContext); // 创建一个View实例供JS使用。
    }

    // 设置属性，一定需要加这个注解，不然不认识
    @ReactProp(name = "color")
    public void setColor(MyCustomView view, String color) {
        view.setColor(Color.parseColor(color));
    }



    /**
     * 可以接收的JS发过来的事件，返回来的数据是一组对应了方法名以及方法对应的一个ID(这个ID需要唯一区分)的Map。
     * 这个在进入App的时候就会运行，得到相应的一组Map。
     */
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("Change", CHANGE_COLOR);
    }

    /**
     * 接收JS事件以后的处理。JS会通过一些发送发送相应的指令过来，Native会由receiveCommand来处理。
     * 事件过来时才会执行。
     */
    @Override
    public void receiveCommand(MyCustomView root, int commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        switch (commandId) {
            case CHANGE_COLOR:
                List data = new ArrayList<>();
                for(int i = 0; i < args.size(); i++){
                    data.add(args.getString(i));
                }
                try {
                    String color = (String)data.get(0);
                    if ("red".equals(color)){
                        root.setColor(root.getResources().getColor(R.color.black));
                    }
                }catch (Exception e){
                    e.printStackTrace();
                }

                break;
        }
    }

    /**
     * 暴露了在JS中定义的方法，例如下面的"onClick"是定义在JS中的方法。
     * 这个在进入App的时候就会运行  将注册的click 映射到js上就是onClick
     */
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put("Change", MapBuilder.of("registrationName", "onChange"))
                .build();
    }

    /**
     * 发射入口，相当于将Native的一些事件也注册给JS。
     * 这个在进入App的时候就会运行。
     */
    @Override
    protected void addEventEmitters(final ThemedReactContext reactContext, final MyCustomView view) {
        super.addEventEmitters(reactContext, view);
        view.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 正常写法 也可以 直接 调用
                 RCTEventEmitter mEventEmitter=reactContext.getJSModule(RCTEventEmitter.class);
                 mEventEmitter.receiveEvent(view.getId(),"Change",Arguments.createMap());
            }
        });
    }

}
