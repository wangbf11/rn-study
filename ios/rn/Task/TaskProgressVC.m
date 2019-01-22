//
//  TaskProgressVC.m
//  rn
//
//  Created by 突突兔 on 2018/12/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "TaskProgressVC.h"

#import "TaskProgressCell.h"

@interface TaskProgressVC ()<UITableViewDelegate, UITableViewDataSource>
@property (weak, nonatomic) IBOutlet UIButton *backButton;
@property (weak, nonatomic) IBOutlet UITableView *tableView;
@property (weak, nonatomic) IBOutlet NSLayoutConstraint *tableViewCOnstraintHeight;


@end

@implementation TaskProgressVC

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
  self.tableView.delegate = self;
  self.tableView.dataSource = self;
  self.tableViewCOnstraintHeight.constant = 800;
  self.tableView.scrollEnabled = NO;
  UINib *nib = [UINib nibWithNibName:@"TaskProgressCell" bundle:nil];
  [self.tableView registerNib:nib forCellReuseIdentifier:@"TaskProgressCell"];
  self.tableView.separatorStyle = UITableViewCellSeparatorStyleNone;
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
  return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
  return 4;
}

-(UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
  TaskProgressCell *cell = [tableView dequeueReusableCellWithIdentifier:@"TaskProgressCell" forIndexPath:indexPath];
  return cell;
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
   [tableView deselectRowAtIndexPath:indexPath animated:YES];
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
