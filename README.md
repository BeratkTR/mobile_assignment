# BSM447 Mobil Uygulama Geliştirme · Dönem Ödevi

## Öğrenci ve Ödev Bilgileri
* **Öğrenci No:** G221210025 (2. Öğretim)
* **Konu:** K30 · Söz Defteri (DummyJSON Quotes)
* **Varyant:** c · Sözler 61–90 (`https://dummyjson.com/quotes?limit=30&skip=60`)
* **Ek Kural:** 3 · Kayıt sayısı (`N kayıt`) ve `"Sonuç bulunamadı"` mesajı
* **Kalıcı Veri Yöntemi:** `@react-native-async-storage/async-storage`

---

## Uygulama Özellikleri
* **Navigasyon:** Alt sekmelerde **Sözler** ve **Kaydedilenler** (Bottom Tab), üstünde açılan **Söz Detayı** ekranı (Stack).
* **Liste Ekranı:**
  * Açılışta API'den verileri çeker ve `FlatList` ile listeler.
  * Listenin en üstünde her açılışta rastgele seçilen **Günün Sözü** kartı yer alır.
  * Büyük/küçük harfe duyarsız arama kutusu ve dinamik kayıt sayısı (`N kayıt`) bulunur.
  * Satırdaki yazar adına dokunulduğunda liste o yazarın sözleriyle süzülür.
* **Detay Ekranı:**
  * Seçilen sözün tamamını, yazarını ve yazarın listedeki diğer sözlerini gösterir.
  * **Kaydet / Kaydedilenlerden Çıkar** düğmesi ile sözü kalıcı hafızaya ekler veya çıkarır.
* **Kaydedilenler Ekranı:**
  * `AsyncStorage` üzerinde saklanan sözleri listeler; uygulama kapatılıp açıldığında veriler korunur.

---

## Kurulum ve Çalıştırma
```bash
npm install
npx expo start
```

---

## Ekran Görüntüleri
> Uygulama çalıştırıldıktan sonra 3 ekranın (Liste, Detay, Kaydedilenler) ekran görüntüleri eklenecektir.

| Liste Ekranı | Detay Ekranı | Kaydedilenler Ekranı |
| :---: | :---: | :---: |
| ![Liste](screenshots/liste.png) | ![Detay](screenshots/detay.png) | ![Kaydedilenler](screenshots/kaydedilenler.png) |

---

## Bağlantılar
* **APK İndirme Bağlantısı (EAS Build):** `[APK Linki Eklenecek]`
* **Ekran Kaydı (Maks. 1 dk):** `[Ekran Kaydı Linki Eklenecek]`
