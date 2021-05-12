pipeline {

    agent any

    stages {
        stage("prepare for production") {
            when {
                branch 'feature/party_management'
            }
            steps {

                echo ' Executing command for production '

                withCredentials([file(credentialsId: 'APIenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                } // End credential step

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'

            } // End steps
        } // End stage 
        stage("prepare for development") {
            when {
                branch 'develop'
            }
            steps {

                echo ' Executing command for development '

                withCredentials([file(credentialsId: 'APIenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                } // End credential step

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'
                
            } // End steps
        } // End stage 
        stage("prepare for testing") {
            when {
                branch 'feature/party_management'
            }
            steps {

                echo ' Executing command for feature testing '

                withCredentials([file(credentialsId: 'APIenv' , variable: 'Env')]){
                    sh 'chmod 700 $WORKSPACE/.env || :'
                    sh 'rm -rf $WORKSPACE/.env || :'
                    sh 'cp $Env $WORKSPACE'                    
                } // End credential step

                sh 'docker-compose down --rmi local || :'
                sh 'docker-compose up -d --build'
                sh 'docker ps -a'
                
            } // End steps
        } // End stage 

    } // End stages
    
} // End pipeline