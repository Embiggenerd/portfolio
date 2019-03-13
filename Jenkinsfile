
pipeline {
  agent any
  // environment {
  //   // CI = 'true'
  //   // HOME = '.'
  //   // npm_config_cache = 'npm-cache'
  // }
  stages {
    stage('Deployment') {
      parallel {
        stage('Staging') {
          when {
            branch 'staging'
          }
          steps {
            withAWS(region:'us-west-2',credentials:'portfolio1-cdcd') {
              s3Delete(bucket: 'stage.igoratakhanov.com', path: '**/*')
              s3Upload(file: 'client', bucket: 'stage.igoratakhanov.com');
            }
          }
        }
        stage('Production') {
          when {
            branch 'production'
          }
          steps {
            withAWS(region:'us-west-2',credentials:'portfolio1-cdcd') {
              s3Delete(bucket: 'igoratakhanov.com', path:'**/*')
              s3Upload(file: 'client', bucket: 'igoratakhanov.com');
            }
          }
         }
      }
    }

  }
}