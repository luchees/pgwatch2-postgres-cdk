import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as PostgresMonitoring from "../lib/postgres-monitoring-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new PostgresMonitoring.PostgresMonitoringStack(
    app,
    "MyTestStack"
  );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {
          PostgresMonitorFargateTaskDefTaskRole1FBF762C: {
            Type: "AWS::IAM::Role",
            Properties: {
              AssumeRolePolicyDocument: {
                Statement: [
                  {
                    Action: "sts:AssumeRole",
                    Effect: "Allow",
                    Principal: {
                      Service: "ecs-tasks.amazonaws.com",
                    },
                  },
                ],
                Version: "2012-10-17",
              },
            },
          },
          PostgresMonitorFargateTaskDef1DCFE1B1: {
            Type: "AWS::ECS::TaskDefinition",
            Properties: {
              ContainerDefinitions: [
                {
                  Environment: [
                    {
                      Name: "PW2_WEBNOANONYMOUS",
                      Value: "true",
                    },
                    {
                      Name: "PW2_GRAFANANOANONYMOUS",
                      Value: "true",
                    },
                  ],
                  Essential: true,
                  Image: "cybertec/pgwatch2-postgres",
                  Name: "PostgresMonitorContainer",
                  PortMappings: [
                    {
                      ContainerPort: 3000,
                      HostPort: 3000,
                      Protocol: "tcp",
                    },
                    {
                      ContainerPort: 8080,
                      HostPort: 8080,
                      Protocol: "tcp",
                    },
                  ],
                },
              ],
              Cpu: "256",
              Family: "MyTestStackPostgresMonitorFargateTaskDef4AB3B1B4",
              Memory: "512",
              NetworkMode: "awsvpc",
              RequiresCompatibilities: ["FARGATE"],
              TaskRoleArn: {
                "Fn::GetAtt": [
                  "PostgresMonitorFargateTaskDefTaskRole1FBF762C",
                  "Arn",
                ],
              },
            },
          },
          FargateCluster7CCD5F93: {
            Type: "AWS::ECS::Cluster",
            Properties: {
              ClusterName: "postgres-monitor-cluster",
            },
          },
          FargateClusterVpc377E8024: {
            Type: "AWS::EC2::VPC",
            Properties: {
              CidrBlock: "10.0.0.0/16",
              EnableDnsHostnames: true,
              EnableDnsSupport: true,
              InstanceTenancy: "default",
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet1SubnetB9C24BC7: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.0.0/18",
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              AvailabilityZone: {
                "Fn::Select": [
                  0,
                  {
                    "Fn::GetAZs": "",
                  },
                ],
              },
              MapPublicIpOnLaunch: true,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Public",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Public",
                },
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet1",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet1RouteTable1D7FA747: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet1",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet1RouteTableAssociation80F1442F: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPublicSubnet1RouteTable1D7FA747",
              },
              SubnetId: {
                Ref: "FargateClusterVpcPublicSubnet1SubnetB9C24BC7",
              },
            },
          },
          FargateClusterVpcPublicSubnet1DefaultRoute80086690: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPublicSubnet1RouteTable1D7FA747",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              GatewayId: {
                Ref: "FargateClusterVpcIGW827638CB",
              },
            },
            DependsOn: ["FargateClusterVpcVPCGW38717255"],
          },
          FargateClusterVpcPublicSubnet1EIPF91909D0: {
            Type: "AWS::EC2::EIP",
            Properties: {
              Domain: "vpc",
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet1",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet1NATGateway5202D86A: {
            Type: "AWS::EC2::NatGateway",
            Properties: {
              AllocationId: {
                "Fn::GetAtt": [
                  "FargateClusterVpcPublicSubnet1EIPF91909D0",
                  "AllocationId",
                ],
              },
              SubnetId: {
                Ref: "FargateClusterVpcPublicSubnet1SubnetB9C24BC7",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet1",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet2Subnet24C0F9D8: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.64.0/18",
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              AvailabilityZone: {
                "Fn::Select": [
                  1,
                  {
                    "Fn::GetAZs": "",
                  },
                ],
              },
              MapPublicIpOnLaunch: true,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Public",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Public",
                },
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet2",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet2RouteTable1493C5D6: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet2",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet2RouteTableAssociation3EFA74DC: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPublicSubnet2RouteTable1493C5D6",
              },
              SubnetId: {
                Ref: "FargateClusterVpcPublicSubnet2Subnet24C0F9D8",
              },
            },
          },
          FargateClusterVpcPublicSubnet2DefaultRoute8E847CD2: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPublicSubnet2RouteTable1493C5D6",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              GatewayId: {
                Ref: "FargateClusterVpcIGW827638CB",
              },
            },
            DependsOn: ["FargateClusterVpcVPCGW38717255"],
          },
          FargateClusterVpcPublicSubnet2EIPBBB24774: {
            Type: "AWS::EC2::EIP",
            Properties: {
              Domain: "vpc",
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet2",
                },
              ],
            },
          },
          FargateClusterVpcPublicSubnet2NATGatewayFFEC8ED2: {
            Type: "AWS::EC2::NatGateway",
            Properties: {
              AllocationId: {
                "Fn::GetAtt": [
                  "FargateClusterVpcPublicSubnet2EIPBBB24774",
                  "AllocationId",
                ],
              },
              SubnetId: {
                Ref: "FargateClusterVpcPublicSubnet2Subnet24C0F9D8",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PublicSubnet2",
                },
              ],
            },
          },
          FargateClusterVpcPrivateSubnet1Subnet9127625F: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.128.0/18",
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              AvailabilityZone: {
                "Fn::Select": [
                  0,
                  {
                    "Fn::GetAZs": "",
                  },
                ],
              },
              MapPublicIpOnLaunch: false,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Private",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Private",
                },
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PrivateSubnet1",
                },
              ],
            },
          },
          FargateClusterVpcPrivateSubnet1RouteTable21B3CEAE: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PrivateSubnet1",
                },
              ],
            },
          },
          FargateClusterVpcPrivateSubnet1RouteTableAssociation78F6E213: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPrivateSubnet1RouteTable21B3CEAE",
              },
              SubnetId: {
                Ref: "FargateClusterVpcPrivateSubnet1Subnet9127625F",
              },
            },
          },
          FargateClusterVpcPrivateSubnet1DefaultRoute0438DCBA: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPrivateSubnet1RouteTable21B3CEAE",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              NatGatewayId: {
                Ref: "FargateClusterVpcPublicSubnet1NATGateway5202D86A",
              },
            },
          },
          FargateClusterVpcPrivateSubnet2Subnet307CEE57: {
            Type: "AWS::EC2::Subnet",
            Properties: {
              CidrBlock: "10.0.192.0/18",
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              AvailabilityZone: {
                "Fn::Select": [
                  1,
                  {
                    "Fn::GetAZs": "",
                  },
                ],
              },
              MapPublicIpOnLaunch: false,
              Tags: [
                {
                  Key: "aws-cdk:subnet-name",
                  Value: "Private",
                },
                {
                  Key: "aws-cdk:subnet-type",
                  Value: "Private",
                },
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PrivateSubnet2",
                },
              ],
            },
          },
          FargateClusterVpcPrivateSubnet2RouteTable7B7F9678: {
            Type: "AWS::EC2::RouteTable",
            Properties: {
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc/PrivateSubnet2",
                },
              ],
            },
          },
          FargateClusterVpcPrivateSubnet2RouteTableAssociation3A46964C: {
            Type: "AWS::EC2::SubnetRouteTableAssociation",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPrivateSubnet2RouteTable7B7F9678",
              },
              SubnetId: {
                Ref: "FargateClusterVpcPrivateSubnet2Subnet307CEE57",
              },
            },
          },
          FargateClusterVpcPrivateSubnet2DefaultRoute35FDD29D: {
            Type: "AWS::EC2::Route",
            Properties: {
              RouteTableId: {
                Ref: "FargateClusterVpcPrivateSubnet2RouteTable7B7F9678",
              },
              DestinationCidrBlock: "0.0.0.0/0",
              NatGatewayId: {
                Ref: "FargateClusterVpcPublicSubnet2NATGatewayFFEC8ED2",
              },
            },
          },
          FargateClusterVpcIGW827638CB: {
            Type: "AWS::EC2::InternetGateway",
            Properties: {
              Tags: [
                {
                  Key: "Name",
                  Value: "MyTestStack/FargateCluster/Vpc",
                },
              ],
            },
          },
          FargateClusterVpcVPCGW38717255: {
            Type: "AWS::EC2::VPCGatewayAttachment",
            Properties: {
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
              InternetGatewayId: {
                Ref: "FargateClusterVpcIGW827638CB",
              },
            },
          },
          PostgresMonitorFargateService2C0453A4: {
            Type: "AWS::ECS::Service",
            Properties: {
              Cluster: {
                Ref: "FargateCluster7CCD5F93",
              },
              DeploymentConfiguration: {
                MaximumPercent: 200,
                MinimumHealthyPercent: 50,
              },
              DesiredCount: 1,
              EnableECSManagedTags: false,
              LaunchType: "FARGATE",
              NetworkConfiguration: {
                AwsvpcConfiguration: {
                  AssignPublicIp: "ENABLED",
                  SecurityGroups: [
                    {
                      "Fn::GetAtt": [
                        "PostgresMonitorFargateServiceSecurityGroup335F7831",
                        "GroupId",
                      ],
                    },
                  ],
                  Subnets: [
                    {
                      Ref: "FargateClusterVpcPublicSubnet1SubnetB9C24BC7",
                    },
                    {
                      Ref: "FargateClusterVpcPublicSubnet2Subnet24C0F9D8",
                    },
                  ],
                },
              },
              ServiceName: "postgres-monitor-service",
              TaskDefinition: {
                Ref: "PostgresMonitorFargateTaskDef1DCFE1B1",
              },
            },
          },
          PostgresMonitorFargateServiceSecurityGroup335F7831: {
            Type: "AWS::EC2::SecurityGroup",
            Properties: {
              GroupDescription:
                "MyTestStack/PostgresMonitorFargateService/SecurityGroup",
              SecurityGroupEgress: [
                {
                  CidrIp: "0.0.0.0/0",
                  Description: "Allow all outbound traffic by default",
                  IpProtocol: "-1",
                },
              ],
              VpcId: {
                Ref: "FargateClusterVpc377E8024",
              },
            },
          },
        },
      },
      MatchStyle.EXACT
    )
  );
});
