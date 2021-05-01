pipeline {
     agent any
     environment {
         withCredentials([file(credentialsId: 'APIenv', variable: 'env')]){
            sh 'cp $env $WORKSPACE'
        }
     }
     stages {
        stage("build") {
            steps {
                echo ' Executing yarn '
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'yarn install'
                    sh 'yarn add --dev typescript'
                }
            }
        }
        stage("Deploy"){
            steps{
                echo ' Executing yarn '
                nodejs(nodeJSInstallationName:'nodejs') {
                    sh 'pm2 delete ${JOB_NAME} || :'
                    sh 'pm2 start yarn --name "${JOB_NAME}" -- start'
                }
            }
        }
    }
}