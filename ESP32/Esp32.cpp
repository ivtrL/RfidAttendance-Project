#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <ESP32MySQL.h>

// Define o pino do RST do MFRC522
#define RST_PIN 5
// Define os pinos do SPI para o MFRC522
#define SS_PIN 18
#define SDA_PIN 23
#define SCK_PIN 19
#define MOSI_PIN 22
#define MISO_PIN 21

// Configuração da rede WiFi
const char* ssid = "sua-rede-wifi";
const char* password = "sua-senha-wifi";

// Configuração do servidor MySQL
const char* host = "endereco-do-host";
const char* user = "usuario-do-banco";
const char* passwordMySQL = "senha-do-banco";
const char* database = "nome-do-banco";

// Objeto MFRC522
MFRC522 mfrc522(SS_PIN, RST_PIN, SDA_PIN, SCK_PIN, MOSI_PIN, MISO_PIN);

// Objeto MySQL
MySQL_Connection conn((Client *)&client);

void setup() {
  Serial.begin(115200);
  SPI.begin();         // Inicializa a comunicação SPI
  mfrc522.PCD_Init();  // Inicializa o MFRC522

  WiFi.begin(ssid, password); // Conecta-se à rede WiFi
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  Serial.println("Conectado ao WiFi!");

  Serial.println("Conectando ao banco de dados MySQL...");
  if (conn.connect(host, 3306, user, passwordMySQL)) {
    Serial.println("Conectado ao banco de dados MySQL!");
  } else {
    Serial.println("Falha na conexão com o banco de dados MySQL!");
  }
}

void loop() {
  // Verifica se um cartão está presente
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    // Lê o ID do cartão
    String cardId = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      cardId += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
      cardId += String(mfrc522.uid.uidByte[i], HEX);
    }
    cardId.toUpperCase();
    
    // Executa a consulta SQL para verificar se o ID do cartão está na tabela
    String query = "SELECT * FROM users WHERE id = '" + cardId + "'";
    MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);
    cur_mem->execute(query);
    
    // Verifica se há resultados da consulta
    row_values *row = NULL;
    column_names *columns = cur_mem->get_columns();
    if (columns) {
      while ((row = cur_mem->get_next_row()) != NULL) {
        // ID do cartão encontrado na tabela
        Serial.println("Cartão válido!");
        // Realize as ações desejadas aqui
      }
    } else {
      Serial.println("Cartão inválido!");
    }

    delete cur_mem;
  }
  
  mfrc522.PICC_HaltA();  // Encerra a comunicação com o cartão
  mfrc522.PCD_StopCrypto1(); // Para a criptografia do cartão
  
  delay(1000); // Aguarda 1 segundo antes de ler novamente
}
