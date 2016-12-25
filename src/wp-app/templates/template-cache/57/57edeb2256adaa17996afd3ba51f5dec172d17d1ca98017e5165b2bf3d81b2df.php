<?php

/* home.html */
class __TwigTemplate_0ad960e20aaae4cd8683bc6af20abf16d6002eb27dc17d94167f5c7a9a5268f7 extends Twig_Template
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
        echo "<header id='home-header'> 
    <a href=\"/\"><img src=\"";
        // line 2
        echo twig_escape_filter($this->env, $this->getAttribute(($context["siteData"] ?? null), "iconUrl", array()), "html", null, true);
        echo "\"/></a>
    <h1 id=\"site-title\">";
        // line 3
        echo twig_escape_filter($this->env, $this->getAttribute(($context["siteData"] ?? null), "title", array()), "html", null, true);
        echo "</h1>
</header>

";
        // line 6
        echo twig_include($this->env, $context, "post-list.html");
        echo "

";
    }

    public function getTemplateName()
    {
        return "home.html";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  32 => 6,  26 => 3,  22 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "home.html", "/Users/bradleykirby/Code/wp-multi/wp-content/themes/WallaceTheme/src/wp-app/templates/home.html");
    }
}
