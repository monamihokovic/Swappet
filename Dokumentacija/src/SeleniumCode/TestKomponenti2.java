/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package seleniumtestprogy;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class TestKomponenti2 {

    public static void main(String[] args) {
        // Putanja do ChromeDrivera
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\PASKO\\Downloads\\chromedriver.exe");

        // Pokretanje ChromeDrivera
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        try {
            // Otvoriti stranicu za kreiranje događaja
            driver.get("https://swappet-app-iod2.onrender.com/createEvent");
            System.out.println("Otvorena stranica: " + driver.getTitle());

            // Kategorija: Odabir radio gumba za kategoriju "Koncerti"
            WebElement categoryRadio = wait.until(ExpectedConditions.elementToBeClickable(
                    By.xpath("//input[@type='radio' and @value='Koncerti']")));
            categoryRadio.click();
            System.out.println("Odabrana kategorija: Koncerti");

            // Datum događaja
            WebElement dateInput = driver.findElement(By.xpath("//input[@type='date']"));
            dateInput.sendKeys("2025-02-15");
            System.out.println("Unesen datum događaja: 2025-02-15");

            // Vrijeme događaja
            WebElement timeInput = driver.findElement(By.xpath("//input[@type='time']"));
            timeInput.sendKeys("18:30");
            System.out.println("Uneseno vrijeme događaja: 18:30");

            // Vrsta transakcije: Odabir "Kupnja"
            WebElement transactionTypeRadio = driver.findElement(By.xpath("//input[@type='radio' and @value='1']"));
            transactionTypeRadio.click();
            System.out.println("Odabrana transakcija: Kupnja");

            // Cijena ulaznice
            WebElement priceInput = driver.findElement(By.xpath("//input[@name='price']"));
            priceInput.sendKeys("100");
            System.out.println("Unesena cijena: 100");

            // Količina ulaznica
            WebElement ticketQuantityInput = driver.findElement(By.xpath("//input[@name='numberOfTickets']"));
            ticketQuantityInput.sendKeys("1");
            System.out.println("Unesena količina ulaznica: 1");

// Čekanje da se pojavi tablica s redom i sjedalom
            WebElement seatTable = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//table[@class='info']")));
            System.out.println("Tablica za unos reda i sjedala je vidljiva.");

// Unos reda i sjedala
            WebElement rowInput = seatTable.findElement(By.xpath("//tr[1]/td[1]/input"));
            rowInput.sendKeys("5");  // Primjer unosa reda
            System.out.println("Unesen red: 5");

            WebElement seatInput = seatTable.findElement(By.xpath("//tr[1]/td[2]/input"));
            seatInput.sendKeys("12");  // Primjer unosa sjedala
            System.out.println("Uneseno sjedalo: 12");

            // Tip ulaznice: Odabir iz padajućeg izbornika
            Select ticketTypeSelect = new Select(driver.findElement(By.xpath("//select[@name='ticketType']")));
            ticketTypeSelect.selectByValue("1"); // "Obična"
            System.out.println("Odabran tip ulaznice: Obična");

            // Opis događaja
            WebElement descriptionInput = driver.findElement(By.xpath("//input[@name='description']"));
            descriptionInput.sendKeys("Ovo je koncert poznatog benda.");
            System.out.println("Unesen opis događaja.");

            // Ulica događaja
            WebElement streetInput = driver.findElement(By.xpath("//input[@name='street']"));
            streetInput.sendKeys("Glavna ulica");
            System.out.println("Unesena ulica: Glavna ulica");

            // Kućni broj
           /* WebElement houseNumberInput = driver.findElement(By.xpath("//input[@name='houseNumber']"));
            houseNumberInput.sendKeys("10");
            System.out.println("Unesen kućni broj: 10");*/

            // Grad
            WebElement cityInput = driver.findElement(By.xpath("//input[@name='city']"));
            cityInput.sendKeys("Zagreb");
            System.out.println("Unesen grad: Zagreb");

            // Klik na gumb "Kreiraj događaj!"
            WebElement submitButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/form/div[3]/input[5]"));
            submitButton.click();
            System.out.println("Kliknuto na gumb 'Kreiraj događaj!'");

            // Čekanje na potvrdu ili preusmjeravanje
            wait.until(ExpectedConditions.urlContains("selection")); // Prilagoditi prema stvarnom URL-u potvrde
            System.out.println("Događaj je uspješno kreiran!");

        } catch (Exception e) {
            System.out.println("Greška: " + e.getMessage());
        } finally {
            // Zatvori pretraživač
            driver.quit();
        }
    }
}
