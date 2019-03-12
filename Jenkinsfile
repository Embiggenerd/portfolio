
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
            withAWS(region:'us-west-2',credentials:'AKIAIFD2LLNVE3GOH4SQ') {
              s3Delete(bucket: 'stage.igoratakhanov.com', path: '**/*')
              s3Upload(file: './' bucket: 'igor.atakhanov.com', path:"./");
            }
            mail(subject: 'Staging Build', body: 'New Deployment to Staging', to: 'igoratakhanov@gmail.com')
          }
          
          // steps {
          //   echo "deploying to stage.igoratakhanov.com"
          // }
          
        }
        stage('Production') {
          when {
            branch 'production'
          }
          // steps {
          //   withAWS(region:'us-west-2',credentials:'AKIAIFD2LLNVE3GOH4SQ') {
          //     s3Delete(bucket: 'stage.igoratakhanov.com', path:'**/*')
          //     s3Upload(bucket: 'stage.igoratakhanov.com', workingDir:'build', includePathPattern:'**/*');
          //   }
          //   mail(subject: 'Production Build', body: 'New Deployment to Production', to: 'igoratakhanov@gmail.com')
          // }
          steps {
            echo "delpoying to igoratakhanov.com"
          }
         
        }
      }
   }

  }
}