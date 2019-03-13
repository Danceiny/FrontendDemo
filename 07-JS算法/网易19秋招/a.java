
import java.util.*;

public class Main {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();
        while (t != 0) {
            t--;
            int n = scanner.nextInt();
            int k = scanner.nextInt();
            int Y = n - k;
            int N = k;
            if (N <= 1 || Y == 0) {
                System.out.println("0 0");
                continue;
            }
            if (Y >= N) {
                System.out.println("0 " + (N - 1));
            } else {
                System.out.println("0 " + (Y));
            }
        }

    }

}