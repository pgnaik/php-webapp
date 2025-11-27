pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "pgn123/php-webapp"   // change to your Docker Hub repo
        DOCKER_TAG   = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                // Pull your code from Git
                git branch: 'main', url: 'https://github.com/pgnaik/php-webapp.git'
            }
        }

        stage('PHP Syntax Check') {
            steps {
                // Basic syntax check for PHP files
                bat 'php -l src/api.php'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_CRED',
                                                     usernameVariable: 'USER',
                                                     passwordVariable: 'PASS')]) {
                        sh "echo $PASS | docker login -u $USER --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Stop and remove existing container if running
                    sh "docker rm -f php-webapp || true"

                    // Run new container
                    sh "docker run -d --name php-webapp -p 80:80 ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo "Deployment success! Open: http://<jenkins-server-ip>:80"
        }
        failure {
            echo "Build or deployment failed."
        }
    }
}
