package vn.phidoisaobang.game;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

// V2.1.42 · toàn màn hình thật (ẩn thanh trạng thái + thanh điều hướng, vuốt mép để hiện tạm) và báo vùng an toàn cho CSS:
//   --satn / --safe-top = phần trên bị che (thanh trạng thái nếu đang hiện, hoặc tai thỏ), --sabn / --safe-bottom = phần dưới.
public class MainActivity extends BridgeActivity {
    private int topCss = 0, botCss = 0;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (Build.VERSION.SDK_INT >= 28) {
            WindowManager.LayoutParams lp = getWindow().getAttributes();
            lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT; // giữ dải tai thỏ đen, nội dung không chui vào
            getWindow().setAttributes(lp);
        }
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        hideBars();
        View root = getWindow().getDecorView();
        ViewCompat.setOnApplyWindowInsetsListener(root, (v, insets) -> {
            float d = getResources().getDisplayMetrics().density;
            Insets cut = insets.getInsets(WindowInsetsCompat.Type.displayCutout());
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            boolean sb = insets.isVisible(WindowInsetsCompat.Type.statusBars());
            boolean nb = insets.isVisible(WindowInsetsCompat.Type.navigationBars());
            int top = Math.max(cut.top, sb ? bars.top : 0);
            int bot = Math.max(cut.bottom, nb ? bars.bottom : 0);
            topCss = Math.round(top / d);
            botCss = Math.round(bot / d);
            pushCss();
            return ViewCompat.onApplyWindowInsets(v, insets);
        });
    }

    private void hideBars() {
        try {
            WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
            c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            c.hide(WindowInsetsCompat.Type.systemBars());
        } catch (Exception ignored) {}
    }

    private void pushCss() {
        try {
            if (getBridge() == null) return;
            WebView w = getBridge().getWebView();
            if (w == null) return;
            final String js = "(function(){var d=document.documentElement;if(!d)return;d.style.setProperty('--satn','" + topCss + "px');d.style.setProperty('--safe-top','" + topCss + "px');d.style.setProperty('--sabn','" + botCss + "px');d.style.setProperty('--safe-bottom','" + botCss + "px');window.__satn=" + topCss + ";if(window.Safe42)window.Safe42(" + topCss + ");})();";
            w.post(() -> { try { w.evaluateJavascript(js, null); } catch (Exception ignored) {} });
        } catch (Exception ignored) {}
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) { hideBars(); pushCss(); }
    }

    @Override
    public void onResume() {
        super.onResume();
        hideBars();
        pushCss();
    }
}
