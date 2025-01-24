
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

public class TestKomponenti4 {

    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\PASKO\\Downloads\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        try {
            driver.get("https://swappet-app-iod2.onrender.com/advertisements");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
            WebElement filterDiv = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("filter")));
            List<WebElement> categories = driver.findElements(By.cssSelector(".filter-kategorija li"));
            for (WebElement category : categories) {
                System.out.println("Category: " + category.getText());
            }
               // Pričekaj da se <select> element učita
            WebElement selectElement = wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("select")));

            // Kreiraj instancu Select klase
            Select select = new Select(selectElement);

            // Odaberi prvi element u listi
            select.selectByIndex(1); // 0 je prvi element, 1 je drugi, itd.

            // Klikni na gumb
            WebElement button = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//*[@id='root']/div/div[2]/div[2]/div[1]/div[1]/button")));
            button.click();
        WebElement finalButton = driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[1]/button"));
        finalButton.click();
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
