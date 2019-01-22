//
//  AlertView.h
//  rn
//
//  Created by 突突兔 on 2018/12/13.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN
@class AlertView;
@protocol AlertViewDelegate <NSObject>

- (void)alertView:(AlertView *)alertView click:(NSInteger)index;

@end

@interface AlertView : UIView

@property (weak, nonatomic) id<AlertViewDelegate> delegate;

- (instancetype)initWithTitle:(NSString *)title money:(NSString *)money image:(UIImage *)image message:(NSString *)message delegate:(id<AlertViewDelegate>)delegate buttonTitles:(NSString *)buttonTitles, ... NS_REQUIRES_NIL_TERMINATION;

- (void)show;

@end

NS_ASSUME_NONNULL_END

