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
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.WebDriverException;

import java.time.Duration;
import java.util.List;
import org.openqa.selenium.Keys;
import org.openqa.selenium.support.ui.Select;
/**
 *
 * @author PASKO
 */
public class TestKomponenti6 {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\PASKO\\Downloads\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://swappet-app-iod2.onrender.com/user/trades");
        // Pričekaj dok gumb ne postane klikabilan
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[5]/button[0]")));

    // Klikni na gumb
    button.click();
        }

         catch (WebDriverException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            // Close the browser after 5 seconds
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            driver.quit();
        }
    }
}
