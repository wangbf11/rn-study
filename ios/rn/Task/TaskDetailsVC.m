//
//  TaskDetailsVC.m
//  rn
//
//  Created by 突突兔 on 2018/12/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "TaskDetailsVC.h"

#import "AlertView.h"

@interface TaskDetailsVC ()
@property (weak, nonatomic) IBOutlet UIButton *backButton;
@property (weak, nonatomic) IBOutlet UIView *timeBackView;
@property (weak, nonatomic) IBOutlet UIButton *testApp;

@property (weak, nonatomic) IBOutlet UIView *imagesBackView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *imagesBackViewConstraintHeight;

@property (weak, nonatomic) IBOutlet UIView *submitDataBackView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *submitDataBackVIewConstraintHeight;

@property NSInteger i;

@end

#define SCREENWIDTH [UIScreen mainScreen].bounds.size.width
#define COLOR_WITH_HEX(hexValue) [UIColor colorWithRed:((float)((hexValue & 0xFF0000) >> 16)) / 255.0 green:((float)((hexValue & 0xFF00) >> 8)) / 255.0 blue:((float)(hexValue & 0xFF)) / 255.0 alpha:1.0f]
@implementation TaskDetailsVC

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view from its nib.
  self.i = 0;
  [self initUI];
}

- (IBAction)backAction:(id)sender {
  [self.navigationController popViewControllerAnimated:YES];
}

- (void)initUI {
  //self.imagesBackViewConstraintHeight.constant = 70 + (SCREENWIDTH - 16 * 5) / 4;
  self.imagesBackViewConstraintHeight.constant = 0;
  [self.imagesBackView setHidden:YES];
  
  //self.submitDataBackVIewConstraintHeight.constant = 251 + (SCREENWIDTH - 16 * 5) / 4;
  self.submitDataBackVIewConstraintHeight.constant = 0;
  [self.submitDataBackView setHidden:YES];
  
  [self.backButton setImageEdgeInsets:UIEdgeInsetsMake(8, 8, 8, 8)];
  self.timeBackView.layer.cornerRadius = 15;
  self.testApp.layer.cornerRadius = 8;
  self.testApp.layer.borderColor = COLOR_WITH_HEX(0xA0A0A0).CGColor;
  self.testApp.layer.borderWidth = 0.5;
}


- (IBAction)receiveAwardsAction:(id)sender {
  if (self.i % 2 == 0) {
    UIImage *image = [UIImage imageNamed:@"006_trophy"];
    AlertView * alertView = [[AlertView alloc]initWithTitle:@"获得奖励" money:@"+1.5元" image:image message:@"获得奖励" delegate:(id<AlertViewDelegate>)self buttonTitles:@"继续赚钱", nil];
    [alertView show];
  }
  else {
    UIImage *image = [UIImage imageNamed:@"006_trophy"];
    AlertView * alertView = [[AlertView alloc]initWithTitle:@"提示" money:@"" image:image message:@"请按照要求填写内容并按照示例截图提交截图。" delegate:(id<AlertViewDelegate>)self buttonTitles:@"检查提交内容", nil];
    [alertView show];
  }
  self.i++;
  
}


/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

@end
