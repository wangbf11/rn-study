//
//  AlertView.m
//  rn
//
//  Created by 突突兔 on 2018/12/13.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AlertView.h"
#define SCREENWIDTH [UIScreen mainScreen].bounds.size.width
#define SCREENHEIGHT [UIScreen mainScreen].bounds.size.height
#define COLOR_WITH_HEX(hexValue) [UIColor colorWithRed:((float)((hexValue & 0xFF0000) >> 16)) / 255.0 green:((float)((hexValue & 0xFF00) >> 8)) / 255.0 blue:((float)(hexValue & 0xFF)) / 255.0 alpha:1.0f]

@interface AlertView()
@property (strong, nonatomic) UIView *backgroundView;
@property (strong, nonatomic) UIView *contentView;

@property (strong, nonatomic) NSMutableArray *buttonArray;
@property (strong, nonatomic) NSMutableArray *buttonTitleArray;

@end

@implementation AlertView

- (instancetype)initWithTitle:(NSString *)title money:(NSString *)money image:(UIImage *)image message:(NSString *)message delegate:(id<AlertViewDelegate>)delegate buttonTitles:(NSString *)buttonTitles, ... NS_REQUIRES_NIL_TERMINATION {
  if (self = [super initWithFrame:[UIScreen mainScreen].bounds]) {
    self.backgroundColor = [UIColor clearColor];
    _backgroundView = [[UIView alloc] initWithFrame:self.frame];
    _backgroundView.backgroundColor = [UIColor blackColor];
    [self addSubview:_backgroundView];
    _contentView = [[UIView alloc] init];
    _contentView.backgroundColor = [UIColor whiteColor];
    _contentView.layer.cornerRadius = 20;
    _contentView.layer.masksToBounds = YES;
    _contentView.frame = CGRectMake(0, 0, SCREENWIDTH - 66, 0);
    [self addSubview:_contentView];
    CGFloat height = 17;
    UILabel *titleLabel = [[UILabel alloc]init];
    titleLabel.frame = CGRectMake(0, height, _contentView.frame.size.width, 33);
    titleLabel.text = title;
    titleLabel.font = [UIFont boldSystemFontOfSize:16];
    titleLabel.textColor = COLOR_WITH_HEX(0x202020);
    titleLabel.textAlignment = NSTextAlignmentCenter;
    [_contentView addSubview:titleLabel];
    height = height + titleLabel.frame.size.height;
    if ([title isEqual: @"获得奖励"]) {
      UILabel *moneyLabel = [[UILabel alloc]init];
      moneyLabel.frame = CGRectMake(0, height, _contentView.frame.size.width, 39);
      moneyLabel.text = money;
      moneyLabel.font = [UIFont boldSystemFontOfSize:24];
      moneyLabel.textColor = COLOR_WITH_HEX(0xF64932);
      moneyLabel.textAlignment = NSTextAlignmentCenter;
      [_contentView addSubview:moneyLabel];
      height = height + moneyLabel.frame.size.height;
      UIImageView *iv = [[UIImageView alloc]init];
      iv.image = image;
      iv.frame = CGRectMake((_contentView.frame.size.width - 106) / 2, height, 106, 97);
      [_contentView addSubview:iv];
      height = height + iv.frame.size.height;
      
      UILabel *messageLabel = [[UILabel alloc]init];
      messageLabel.frame = CGRectMake(0, height, _contentView.frame.size.width, 40);
      messageLabel.text= message;
      messageLabel.font = [UIFont systemFontOfSize:14];
      messageLabel.textColor = COLOR_WITH_HEX(0x202020);
      messageLabel.textAlignment = NSTextAlignmentCenter;
      [_contentView addSubview:messageLabel];
      height = height + messageLabel.frame.size.height + 2;
    }
    else {
      UILabel *messageLabel = [[UILabel alloc]init];
      messageLabel.frame = CGRectMake(36, height, _contentView.frame.size.width - 72, 100);
      messageLabel.text = message;
      messageLabel.font = [UIFont systemFontOfSize:14];
      messageLabel.textColor = COLOR_WITH_HEX(0x202020);
      messageLabel.textAlignment = NSTextAlignmentCenter;
      [_contentView addSubview:messageLabel];
      messageLabel.numberOfLines = 0;
      height = height + messageLabel.frame.size.height;
    }
    UIView *lineView = [[UIView alloc]init];
    lineView.frame = CGRectMake(33, height, _contentView.frame.size.width - 66, 0.5);
    lineView.backgroundColor = COLOR_WITH_HEX(0xE5E5E5);
    [_contentView addSubview:lineView];
    
    _buttonArray = [NSMutableArray array];
    _buttonTitleArray = [NSMutableArray array];
    va_list args;
    va_start(args, buttonTitles);
    if (buttonTitles)
    {
      [_buttonTitleArray addObject:buttonTitles];
      while (1)
      {
        NSString *  otherButtonTitle = va_arg(args, NSString *);
        if(otherButtonTitle == nil) {
          break;
        } else {
          [_buttonTitleArray addObject:otherButtonTitle];
        }
      }
    }
    va_end(args);
    [self initAllButtons:SCREENWIDTH - 66 height:height];
    _contentView.frame = CGRectMake(0, 0, SCREENWIDTH - 66, height + 50);
    _contentView.center = self.center;
  }
  return self;
}

- (void)show {
  UIWindow *window = [[UIApplication sharedApplication] keyWindow];
  NSArray *windowViews = [window subviews];
  if(windowViews && [windowViews count] > 0){
    UIView *subView = [windowViews objectAtIndex:[windowViews count]-1];
    for(UIView *aSubView in subView.subviews)
    {
      [aSubView.layer removeAllAnimations];
    }
    [subView addSubview:self];
    [self showBackground];
    [self showAlertAnimation];
  }
}

- (void)hide {
  _contentView.hidden = YES;
  [self hideAlertAnimation];
  [self removeFromSuperview];
}

- (void)showBackground
{
  _backgroundView.alpha = 0;
  [UIView beginAnimations:@"fadeIn" context:nil];
  [UIView setAnimationDuration:0.35];
  _backgroundView.alpha = 0.6;
  [UIView commitAnimations];
}

-(void)showAlertAnimation
{
  CAKeyframeAnimation * animation;
  animation = [CAKeyframeAnimation animationWithKeyPath:@"transform"];
  animation.duration = 0.30;
  animation.removedOnCompletion = YES;
  animation.fillMode = kCAFillModeForwards;
  NSMutableArray *values = [NSMutableArray array];
  [values addObject:[NSValue valueWithCATransform3D:CATransform3DMakeScale(0.9, 0.9, 1.0)]];
  [values addObject:[NSValue valueWithCATransform3D:CATransform3DMakeScale(1.1, 1.1, 1.0)]];
  [values addObject:[NSValue valueWithCATransform3D:CATransform3DMakeScale(1.0, 1.0, 1.0)]];
  animation.values = values;
  [_contentView.layer addAnimation:animation forKey:nil];
}

- (void)hideAlertAnimation {
  [UIView beginAnimations:@"fadeIn" context:nil];
  [UIView setAnimationDuration:0.35];
  _backgroundView.alpha = 0.0;
  [UIView commitAnimations];
}

- (void)initAllButtons:(CGFloat)width height: (CGFloat)height {
  if (_buttonTitleArray.count > 0) {
    CGFloat buttonWidth = width / _buttonTitleArray.count;
    for (NSString *buttonTitle in _buttonTitleArray) {
      NSInteger index = [_buttonTitleArray indexOfObject:buttonTitle];
      UIButton *button = [[UIButton alloc] initWithFrame:CGRectMake(index * buttonWidth,height, buttonWidth, 50)];
      button.titleLabel.font = [UIFont systemFontOfSize:14];
      [button setTitle:buttonTitle forState:UIControlStateNormal];
      [button setTitleColor:COLOR_WITH_HEX(0xF97F42) forState:UIControlStateNormal];
      [button addTarget:self action:@selector(buttonWithPressed:) forControlEvents:UIControlEventTouchUpInside];
      [_buttonArray addObject:button];
      [_contentView addSubview:button];
    }
  }
}

- (void)buttonWithPressed:(UIButton *)button {
  if (_delegate && [_delegate respondsToSelector:@selector(alertView:clickedButtonAtIndex:)]) {
    NSInteger index = [_buttonTitleArray indexOfObject:button.titleLabel.text];
    [_delegate alertView:self click:index];
  }
  [self hide];
}

@end
