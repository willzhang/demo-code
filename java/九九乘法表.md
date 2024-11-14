## 九九乘法表

```java
public class MultiplicationTable {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {  // 外层循环控制行数
            for (int j = 1; j <= i; j++) {  // 内层循环控制每行的列数
                System.out.print(j + " * " + i + " = " + (i * j) + "\t");
            }
            System.out.println();  // 每行输出后换行
        }
    }
}
```
