pipeline {
     agent any
     stages {
        stage("build") {
            steps {
                echo ' Executing yarn '
                withCredentials([file(credentialsId: 'APIenv', variable: 'envFile')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $envFile $WORKSPACE'
                }
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
                    sh 'pm2 start $WORKSPACE/src/index.js -n "${JOB_NAME}" 
                }
            }
        }
    }
}