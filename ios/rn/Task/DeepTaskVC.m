//
//  DeepTaskVC.m
//  rn
//
//  Created by 突突兔 on 2018/12/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "DeepTaskVC.h"
#import "TaskCell.h"

@interface DeepTaskVC ()<UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UIButton *backButton;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *tableViewConstraintHeight;

@end

#define SCREENWIDTH [UIScreen mainScreen].bounds.size.width
#define COLOR_WITH_HEX(hexValue) [UIColor colorWithRed:((float)((hexValue & 0xFF0000) >> 16)) / 255.0 green:((float)((hexValue & 0xFF00) >> 8)) / 255.0 blue:((float)(hexValue & 0xFF)) / 255.0 alpha:1.0f]
@implementation DeepTaskVC

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view from its nib.
  [self initUI];
}

- (IBAction)backAction:(id)sender {
  [self.navigationController popViewControllerAnimated:YES];
}

- (void)initUI {
  [self.backButton setImageEdgeInsets:UIEdgeInsetsMake(8, 8, 8, 8)];
  self.tableViewConstraintHeight.constant = 1500;
  self.tableView.scrollEnabled = NO;
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  UINib *nib = [UINib nibWithNibName:@"TaskCell" bundle:nil];
  [self.tableView registerNib:nib forCellReuseIdentifier:@"TaskCell"];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return  2;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return 5;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  TaskCell *cell = [tableView dequeueReusableCellWithIdentifier:@"TaskCell" forIndexPath:indexPath];
  return cell;
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
  UIView *header = [[UIView alloc]init];
  UILabel *label = [[UILabel alloc]init];
  label.frame = CGRectMake(18, 14, SCREENWIDTH - 36, 46);
  label.font = [UIFont boldSystemFontOfSize:20];
  label.textColor = COLOR_WITH_HEX(0x202020);
  label.text = @"今天";
  [header addSubview:label];
  return header;
}

- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section {
  return 60;
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
