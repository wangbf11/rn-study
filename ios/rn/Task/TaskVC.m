//
//  TaskVC.m
//  rn
//
//  Created by 突突兔 on 2018/12/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "TaskVC.h"
#import "TaskCell.h"

#import "DeepTaskVC.h"
#import "TaskProgressVC.h"
#import "TaskDetailsVC.h"

#import <objc/runtime.h>

#define SCREENWIDTH [UIScreen mainScreen].bounds.size.width
#define SCREENHEIGHT [UIScreen mainScreen].bounds.size.height
#define COLOR_WITH_HEX(hexValue) [UIColor colorWithRed:((float)((hexValue & 0xFF0000) >> 16)) / 255.0 green:((float)((hexValue & 0xFF00) >> 8)) / 255.0 blue:((float)(hexValue & 0xFF)) / 255.0 alpha:1.0f]
@interface TaskVC ()<UIScrollViewDelegate, UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UIImageView *headImageView;
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *tableViewConstraintHeight;
@property (weak, nonatomic) IBOutlet UILabel *numLabel;
@property (weak, nonatomic) IBOutlet UIButton *backButton;
@property (weak, nonatomic) IBOutlet UIButton *rightButton;

@end

@implementation TaskVC

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view from its nib.
  [self initUI];
}
- (IBAction)backAction:(id)sender {
  [self.navigationController popViewControllerAnimated:YES];
}

- (IBAction)rightAction:(id)sender {
  TaskProgressVC *vc = [[TaskProgressVC alloc]initWithNibName:@"TaskProgressVC" bundle:nil];
  [self.navigationController pushViewController:vc animated:YES];
}

- (IBAction)deepTaskAction:(id)sender {
  DeepTaskVC *vc = [[DeepTaskVC alloc]initWithNibName:@"DeepTaskVC" bundle:nil];
  [self.navigationController pushViewController:vc animated:YES];
}

- (void)initUI {
  [self.backButton setImageEdgeInsets:UIEdgeInsetsMake(8, 8, 8, 8)];
  self.rightButton.layer.cornerRadius = 5;
  self.rightButton.layer.borderWidth = 0.5;
  self.rightButton.layer.borderColor = COLOR_WITH_HEX(0xF97F30).CGColor;
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  UINib *nib = [UINib nibWithNibName:@"TaskCell" bundle:nil];
  [self.tableView registerNib:nib forCellReuseIdentifier:@"TaskCell"];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
  self.tableViewConstraintHeight.constant = 5 * 100;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return  1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return 5;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  TaskCell *cell = [tableView dequeueReusableCellWithIdentifier:@"TaskCell" forIndexPath:indexPath];
  return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
  [tableView deselectRowAtIndexPath:indexPath animated:YES];
  //TaskDetailsVC *vc = [[TaskDetailsVC alloc]initWithNibName:@"TaskDetailsVC" bundle:nil];
  //[self.navigationController pushViewController:vc animated:YES];
  
  Class lsawsc = objc_getClass("LSApplicationWorkspace");
  SEL selector = NSSelectorFromString(@"defaultWorkspace");
  NSObject* workspace = ((NSObject* (*)(id, SEL))[lsawsc methodForSelector:selector])(lsawsc, selector);
  if ([workspace respondsToSelector:NSSelectorFromString(@"openApplicationWithBundleID:")]) {
    [workspace performSelector:@selector(openApplicationWithBundleID:) withObject:@"haveANiceDay.one"];
  }
}

-(void)openApplicationWithBundleID:(NSString *) bid {

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
