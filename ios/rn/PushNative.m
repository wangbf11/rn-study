//
//  PushNative.m
//  rn
//
//  Created by 突突兔 on 2018/12/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "PushNative.h"

#import <React/RCTBridge.h>

#import "TaskVC.h"
#import "AppDelegate.h"

@implementation PushNative

RCT_EXPORT_MODULE(PushNative)
// RN跳转原生界面
// RNOpenOneVC指的就是跳转的方法，下面会用到
RCT_EXPORT_METHOD(RNOpenOneVC){
  
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    TaskVC *vc = [[TaskVC alloc]initWithNibName:@"TaskVC" bundle:nil];
    [app.nav pushViewController:vc animated:YES];
  });
}
@end
