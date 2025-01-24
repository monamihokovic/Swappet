import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class TestKomponenti1 {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\PASKO\\Downloads\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10)); 
        try {
            driver.get("https://swappet-app-iod2.onrender.com/");
            System.out.println("Otvorena stranica: " + driver.getTitle());
            WebElement loginButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='root']/div/button[1]"))); // Dugme za login
            loginButton.click();
            WebElement secondLink = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/html/body/div/table/tbody/tr/td/a")));
            secondLink.click();
            WebElement emailInput = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"identifierId\"]"))); // Unos emaila
            emailInput.sendKeys("rodjowara@gmail.com");
            WebElement submitDiv = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"identifierNext\"]/div"))); 
            submitDiv.click();
            System.out.println("Prijava uspješna, korisnik registriran.");    
            WebElement passwordInput = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"password\"]/div[1]/div/div[1]/input"))); // Unos lozinke
            passwordInput.sendKeys("");
            WebElement passwordNextDiv = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id=\"passwordNext\"]/div"))); 
            passwordNextDiv.click();
            System.out.println("Prijava uspješna, korisnik registriran.");
        } catch (Exception e) {
            System.out.println("Greška: " + e.getMessage());
        } finally {
            driver.quit();
        }
    }
}
