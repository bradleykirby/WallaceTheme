<?php

/* post-item.html */
class __TwigTemplate_847b94f5af99997576418a2c996333999a49a220385febcab3859b7ad5cc15ab extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        if (($this->getAttribute(($context["post"] ?? null), "featured", array()) == true)) {
            // line 2
            echo "    <wal-post-item class=\"post-preview featured\">

    ";
            // line 4
            if (($this->getAttribute(($context["post"] ?? null), "imageURLHiRes", array()) != "NONE")) {
                // line 5
                echo "        <div class=\"post-image-wrapper\">
            <img class=\"post-image\" src=\"";
                // line 6
                echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "imageURLHiRes", array()), "html", null, true);
                echo "\"/>
        </div>
    ";
            }
            // line 9
            echo "
        <a class=\"post-info\" href=\"";
            // line 10
            echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "path", array()), "html", null, true);
            echo "\">
            <h2 class=\"post-title\">";
            // line 11
            echo $this->getAttribute(($context["post"] ?? null), "title", array());
            echo "</h2>
            <div class=\"excerpt\">";
            // line 12
            echo $this->getAttribute(($context["post"] ?? null), "excerpt", array());
            echo "</div>
            <div class=\"category\">
                <span>";
            // line 14
            echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "categoryString", array()), "html", null, true);
            echo "</span>
            </div>
        </a>
        <div class=\"excerpt-drawer\">";
            // line 17
            echo $this->getAttribute(($context["post"] ?? null), "excerpt", array());
            echo "</div>
        <hr class =\"post-divider\">
    </wal-post-item>
";
        }
        // line 21
        echo "
";
        // line 22
        if (($this->getAttribute(($context["post"] ?? null), "featured", array()) == false)) {
            // line 23
            echo "    <wal-post-item class=\"post-preview\">

        ";
            // line 25
            if (($this->getAttribute(($context["post"] ?? null), "imageURLLowRes", array()) != "NONE")) {
                // line 26
                echo "            <div class=\"post-image-wrapper\">
                <img class=\"post-image\" src=\"";
                // line 27
                echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "imageURLLowRes", array()), "html", null, true);
                echo "\"/>
            </div>
        ";
            }
            // line 30
            echo "
        <a class=\"post-info\" href=\"";
            // line 31
            echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "path", array()), "html", null, true);
            echo "\">
            <h2 class=\"post-title\">";
            // line 32
            echo $this->getAttribute(($context["post"] ?? null), "title", array());
            echo "</h2>
            <div class=\"excerpt\">";
            // line 33
            echo $this->getAttribute(($context["post"] ?? null), "excerpt", array());
            echo "</div>
            <div class=\"category\">
                <span>";
            // line 35
            echo twig_escape_filter($this->env, $this->getAttribute(($context["post"] ?? null), "categoryString", array()), "html", null, true);
            echo "</span>
            </div>
        </a>
        <div class=\"excerpt-drawer\">";
            // line 38
            echo $this->getAttribute(($context["post"] ?? null), "excerpt", array());
            echo "</div>
        <hr class =\"post-divider\">
    </wal-post-item>
";
        }
    }

    public function getTemplateName()
    {
        return "post-item.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  107 => 38,  101 => 35,  96 => 33,  92 => 32,  88 => 31,  85 => 30,  79 => 27,  76 => 26,  74 => 25,  70 => 23,  68 => 22,  65 => 21,  58 => 17,  52 => 14,  47 => 12,  43 => 11,  39 => 10,  36 => 9,  30 => 6,  27 => 5,  25 => 4,  21 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "post-item.html", "/Users/bradleykirby/Code/wallace-local/wp-content/themes/Wallace/src/wp-app/templates/post-item.html");
    }
}
