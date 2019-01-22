//
//  TaskProgressCell.m
//  rn
//
//  Created by 突突兔 on 2018/12/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "TaskProgressCell.h"

@implementation TaskProgressCell

- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
  self.backView.layer.cornerRadius = 8;
  self.backView.layer.shadowOpacity = 0.4;// 阴影透明度
  
  self.backView.layer.shadowColor = [UIColor grayColor].CGColor;// 阴影的颜色
  self.backView.layer.shadowRadius = 5;// 阴影扩散的范围控制
  self.backView.layer.shadowOffset = CGSizeMake(1, 1);// 阴影的范围
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
}

@end
