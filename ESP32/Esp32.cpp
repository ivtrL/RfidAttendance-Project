#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <MySQL_Connection.h>
#include <MySQL_Cursor.h>

#define SS_PIN 5
#define RST_PIN 4

// Variáveis do cartão mestre
byte masterCardUid[] = {0x11, 0x22, 0x33, 0x44};
bool isMasterCard = false;
bool configMode = false;

// Variáveis do dispositivo
byte deviceUid[] = {0xAA, 0xBB, 0xCC, 0xDD};
bool deviceVerified = false;

// Configurações da rede WiFi
const char* ssid = "NomeDaRede";
const char* password = "SenhaDaRede";

// Configurações do banco de dados MySQL
IPAddress server_addr(192, 168, 1, 100);
char user[] = "usuario";
char password[] = "senha";
char schema[] = "nome_do_banco";

MFRC522 mfrc522(SS_PIN, RST_PIN);
WiFiClient client;
MySQL_Connection conn((Client *)&client);

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();

  connectWiFi();
  connectMySQL();

  verifyDevice();
}

void loop() {
  if (!deviceVerified) {
    return;
  }

  if (!configMode) {
    if (checkCardPresence()) {
      Serial.println("PRESENTE");
    } else {
      Serial.println("NÃO PRESENTE");
    }
  } else {
    if (checkMasterCard()) {
      configMode = false;
      Serial.println("Saindo do modo de configuração");
    } else {
      addCardToDatabase();
    }
  }
}

bool checkCardPresence() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    byte buffer[4];
    MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);

    if (piccType == MFRC522::PICC_TYPE_MIFARE_1K) {
      for (byte i = 0; i < 4; i++) {
        buffer[i] = mfrc522.uid.uidByte[i];
      }

      // Verificar se o ID do cartão está na tabela "users" no campo "card_uid"
      char query[128];
      sprintf(query, "SELECT * FROM users WHERE card_uid = '%02x%02x%02x%02x'", buffer[0], buffer[1], buffer[2], buffer[3]);

      MySQL_Cursor* cursor = new MySQL_Cursor(&conn);
      cursor->execute(query);

      if (cursor->available()) {
        delete cursor;
        return true;
      }
    }

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
  }

  return false;
}

bool checkMasterCard() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    byte buffer[4];
    MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);

    if (piccType == MFRC522::PICC_TYPE_MIFARE_1K) {
      for (byte i = 0; i < 4; i++) {
        buffer[i] = mfrc522.uid.uidByte[i];
      }

      if (memcmp(buffer, masterCardUid, 4) == 0) {
        isMasterCard = true;
        return true;
      }
    }

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
  }

  return false;
}

void addCardToDatabase() {
  if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    byte buffer[4];
    MFRC522::PICC_Type piccType = mfrc522.PICC_GetType(mfrc522.uid.sak);

    if (piccType == MFRC522::PICC_TYPE_MIFARE_1K) {
      for (byte i = 0; i < 4; i++) {
        buffer[i] = mfrc522.uid.uidByte[i];
      }

      // Procurar pelo primeiro registro com valor 1 na coluna "add_card" e atualizar com o ID do cartão lido
      char query[128];
      sprintf(query, "UPDATE users SET card_uid = '%02x%02x%02x%02x', add_card = 0 WHERE add_card = 1 LIMIT 1", buffer[0], buffer[1], buffer[2], buffer[3]);

      MySQL_Cursor* cursor = new MySQL_Cursor(&conn);
      cursor->execute(query);
      delete cursor;

      Serial.println("Cartão adicionado ao banco de dados");
    }

    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
  }
}

void verifyDevice() {
  // Verificar se a variável "device_uid" está presente na tabela "devices" no campo "device_uid"
  char query[128];
  sprintf(query, "SELECT * FROM devices WHERE device_uid = '%02x%02x%02x%02x'", deviceUid[0], deviceUid[1], deviceUid[2], deviceUid[3]);

  MySQL_Cursor* cursor = new MySQL_Cursor(&conn);
  cursor->execute(query);

  if (cursor->available()) {
    deviceVerified = true;
  } else {
    deviceVerified = false;
    Serial.println("Dispositivo não verificado. O código não funcionará.");
  }

  delete cursor;
}

void connectWiFi() {
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }

  Serial.println("Conectado ao WiFi!");
}

void connectMySQL() {
  while (!conn.connect(server_addr, 3306, user, password)) {
    delay(1000);
    Serial.println("Falha na conexão com o banco de dados MySQL...");
  }

  Serial.println("Conectado ao banco de dados MySQL!");
  conn.selectDB(schema);
}