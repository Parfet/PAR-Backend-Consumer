pipeline {

    agent any

    stages {
        stage("prepare for production") {
            
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

    } // End stages
    
} // End pipeline
