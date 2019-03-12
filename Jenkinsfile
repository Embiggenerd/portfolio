
pipeline {
  agent {
    // docker {
    //   image 'node:10-alpine'
    //   args '-p 20001-20100:3000'
    // }
    any
  }
  // environment {
  //   // CI = 'true'
  //   // HOME = '.'
  //   // npm_config_cache = 'npm-cache'
  // }
  stages {
    // stage('Install Packages') {
    //   steps {
    //     sh 'npm install'
    //   }
    // }
    // stage('Test and Build') {
    //   parallel {
    //     stage('Run Tests') {
    //       steps {
    //         sh 'npm run test'
    //       }
    //     }
    //     stage('Create Build Artifacts') {
    //       steps {
    //         sh 'npm run build'
    //       }
    //     }
    //   }
    // }
    stage('Deployment') {
      parallel {
        stage('Staging') {
          when {
            branch 'staging'
          }
          // steps {
          //   withAWS(region:'us-west-2',credentials:'AKIAIFD2LLNVE3GOH4SQ') {
          //     s3Delete(bucket: 'igoratakhanov.com', path:'**/*')
          //     s3Upload(bucket: 'igoratakhanov.com', workingDir:'build', includePathPattern:'**/*');
          //   }
          //   mail(subject: 'Staging Build', body: 'New Deployment to Staging', to: 'igoratakhanov@gmail.com')
          // }
          steps {
            echo "deploying to stage.igoratakhanov.com"
            mail(subject: 'Staging Build', body: 'New Deployment to Staging', to: 'igoratakhanov@gmail.com')
          }
          
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
          echo "delpoying to igoratakhanov.com"
        }
      }
   }


}