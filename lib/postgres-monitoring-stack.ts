import * as cdk from "@aws-cdk/core";
import * as ecs from "@aws-cdk/aws-ecs";

export class PostgresMonitoringStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /* secrets
    Daemon
    Postgres metrics store
    Webui
    Grafana
    */

    //fargate

    const prefix = "postgres-monitor";

    const fargateTaskDef = new ecs.FargateTaskDefinition(
      this,
      "PostgresMonitorFargateTaskDef"
    );
    const fargate = new ecs.FargateService(
      this,
      "PostgresMonitorFargateService",
      {
        serviceName: `${prefix}-service`,
        cluster: new ecs.Cluster(this, "FargateCluster", {
          clusterName: `${prefix}-cluster`,
        }),
        taskDefinition: fargateTaskDef,
        assignPublicIp: true,
        desiredCount: 1,
      }
    );
    fargateTaskDef.addContainer("PostgresMonitorContainer", {
      image: ecs.ContainerImage.fromRegistry("cybertec/pgwatch2-postgres"),
      environment: {
        PW2_WEBNOANONYMOUS: "true",
        PW2_GRAFANANOANONYMOUS: "true",
      },
      portMappings: [
        { containerPort: 3000, hostPort: 3000 },
        { containerPort: 8080, hostPort: 8080 },
      ],
    });

    //EFS
  }
}
